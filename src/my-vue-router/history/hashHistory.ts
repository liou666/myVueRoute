/* eslint-disable @typescript-eslint/no-explicit-any */
interface RouteMap {
  path: string;
  parent: null | RouteMap;
  component: any;
}

interface CurrentRoute {
  path: string;
  matched: Array<RouteMap> | [];
}

interface RouterOptions {
  path: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  component: any;
  children?: Array<RouterOptions>;
  parent?: RouterOptions | null;
}

interface RouteMap {
  path: string;
  parent: null | RouteMap;
  component: any;
}

interface Matcher {
  pathList: string[];
  pathMap: any;
}

import MyVueRouter from "../index";

export class HashHistory {
  current: CurrentRoute = { path: "/", matched: [] };
  cb: null | ((_router: CurrentRoute) => void);
  constructor(public routes: MyVueRouter) {
    this.routes = routes; //储存router对象
    this.setHashUrl();
    this.handleHashChange();
    this.cb = null;
  }

  setHashUrl(): void {
    const hashPath = location.href.includes("#")
      ? location.href
      : location.href + "#/";
    location.href = hashPath;
  }

  handleHashChange(): void {
    window.addEventListener("hashchange", () => {
      this.goPath(location.hash);
    });
  }

  //url改变之后路由跳转
  goPath(path: string): void {
    const currentRoute = createMatcher(path, this.routes.routerOptions);
    (this.cb as (_router: CurrentRoute) => void)(currentRoute);
  }

  listener(cb: (_router: CurrentRoute) => void): void {
    this.cb = cb;
  }
}

function createMatcher(
  currentPath: string,
  router: Array<RouterOptions>
): CurrentRoute {
  const { pathMap } = createRouteMap(router);

  let record: Array<any> | undefined = [];
  record = pathMap[currentPath];
  const currentPathMap = {
    path: currentPath,
  };
  if (record) {
    return addRoute(record, currentPathMap);
  } else {
    return addRoute(null, currentPathMap);
  }
}

function createRouteMap(router: Array<RouterOptions>): Matcher {
  const pathMap: any = {};
  const pathList: string[] = [];

  function loop(router: Array<RouterOptions>) {
    router.forEach((x) => {
      pathList.push(x.path);
      pathMap[x.path] = {
        path: x.path,
        parent: x.parent || null,
        component: x.component,
      };
      if (x.children) {
        x.children.forEach((y) => {
          y.parent = x;
          y.path = /^\//.test(y.path) ? y.path : x.path + "/" + y.path; //如果childrn的path是 / 开头，则指定为根目录
        });
        loop(x.children);
      }
    });
  }

  loop(router);

  return {
    pathMap,
    pathList,
  };
}

// function getMatchedRoutes(path: string): CurrentRoute {}

function addRoute(record: any, current: any): CurrentRoute {
  const res: Array<any> = [];

  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...current,
    matched: res,
  };
}
