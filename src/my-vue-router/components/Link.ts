export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      require: true,
    },
  },
  render: function (h: any): any {
    return h(
      "a",
      {
        attrs: {
          href: (this as any).to,
        },
        on: {
          click: (this as any).myClick,
        },
      },
      [(this as any).$slots.default]
    );
  },
  methods: {
    myClick(e: Event) {
      location.hash = (this as any).to;
      e.preventDefault(); //阻止点击a标签默认跳转事件
    },
  },
};
