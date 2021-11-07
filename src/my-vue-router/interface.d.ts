export interface CurrentRoute {
    path: string;
    matched: Array<RouteMap> | [];
}

export interface RouterOptions {
    path: string;
    name?: string;
    component: any;
    children?: Array<RouterOptions>;
    parent?: RouterOptions | null;
}

export interface RouteMap {
    path: string;
    parent: null | RouteMap;
    component: any;
}
export interface Matcher {
    pathList: string[];
    pathMap: any;
}

export interface RouterConfig {
    mode?: string;
    routes: Array<RouterOptions>;
}