export default {
  name: "RouterView",
  render: function (h: any): any {
    (this as any).isRouterViewComponent = true;

    let parent = (this as any).$parent;
    let deep = 0;

    const { matched } = (this as any).$route;

    while (parent) {
      if (parent.isRouterViewComponent) {
        deep++;
      }
      parent = parent.$parent;
    }

    return matched[deep] ? h(matched[deep].component) : h();
  },
};
