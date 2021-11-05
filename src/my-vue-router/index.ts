export interface RouterOptions {
  path: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  component: any;
  children?: Array<RouterOptions>;
  parent?: RouterOptions | null;
}

interface RouterConfig {
  mode?: string;
  routes: Array<RouterOptions>;
}

interface RouteMap {
  path: string;
  parent: null | RouteMap;
  component: any;
}

// interface PathMap {
//     path: string;
//     parent: null | RouteMap;
//     component: any;
//   }

interface CurrentRoute {
  path: string;
  matched: Array<RouteMap> | [];
}

import { install } from "./install";
import { HashHistory } from "./history/hashHistory";
import Vue from "vue";

export default class MyVueRouter {
  routerOptions: Array<RouterOptions>; //路由匹配规则配置选项
  history!: HashHistory; //目前只完成hash模式，history模式需要与后端配合，abstract模式用在非浏览器环境
  mode: string;
  pathMap: any;
  static install = install;

  constructor(options: RouterConfig) {
    this.routerOptions = options.routes;
    this.mode = options.mode || "hash";
    switch (this.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        // this.history = new HashHistory(this);
        break;
      case "abstract":
        // this.history = new HashHistory(this);
        break;
      default:
        throw new Error("mode is not supported!");
    }
  }

  init(app: any): void {
    //数据响应式，url变化时动态更新_router的值
    this.history.listener((_route: CurrentRoute) => {
      app._route = _route;
    });

    //页面刷新不会触发hashchange事件,需手动刷新
    this.history.goPath(location.hash.slice(1));
  }
}
