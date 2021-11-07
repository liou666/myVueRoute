import MyVueRouter from "@/my-vue-router";
import { CurrentRoute, RouterOptions, RouteMap, Matcher } from "../interface";

export class HashHistory {
  current: CurrentRoute = addRoute(null, { path: "/" });
  cb: null | ((_router: CurrentRoute) => void);
  constructor(public routes: MyVueRouter) {
    this.routes = routes; //储存router对象
    this.setHashUrl(); //将url处理为hash形式
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
      this.goPath(location.hash.slice(1));
    });
  }

  //url改变之后路由跳转
  goPath(path: string): void {
    const currentRoute = getCurrentRoute(path, this.routes.routerOptions);
    (this.cb as (_router: CurrentRoute) => void)(currentRoute);
    this.current = currentRoute;
  }

  listener(cb: (_router: CurrentRoute) => void): void {
    this.cb = cb;
  }
}

function getCurrentRoute(
  currentPath: string,
  router: Array<RouterOptions>
): CurrentRoute {
  const { pathMap } = createRouteMap(router);

  const record: RouteMap | undefined = pathMap[currentPath];
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

function addRoute(
  record: RouteMap | null,
  current: { path: string }
): CurrentRoute {
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
