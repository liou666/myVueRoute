import Link from "./components/Link";
import View from "./components/View";

export function install(Vue: any) {
    if ((install as any).installed) return;

    (install as any).installed = true;

    Vue.mixin({
        beforeCreate() {
            //判断是否为根组件
            if (this.$options.router) {
                this._routerRoot = this;
                this.$router = this.$options.router;
                this.$router.init(this);
                Vue.util.defineReactive(this, "_route", this.$router.history.current)
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot;
                this.$router = this._routerRoot.$router
            }
        },
    });

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })

    Vue.component("my-router-link", Link);
    Vue.component("my-router-view", View)

}