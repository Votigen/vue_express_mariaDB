"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "customer",
  props: {
    customer: String,
    content: String,
    company: String,
    // 新增：公司
    avatar: String,
    // 新增：头像 URL
    to: {
      type: String,
      default: ""
      // 点击跳转的页面
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.avatar
      }, __props.avatar ? {
        b: __props.avatar
      } : {
        c: common_vendor.t(__props.customer ? __props.customer.slice(0, 1) : "U")
      }, {
        d: common_vendor.t(__props.customer),
        e: __props.company
      }, __props.company ? {
        f: common_vendor.t(__props.company)
      } : {}, {
        g: common_vendor.t(__props.content),
        h: __props.to
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2e03e27"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/customer/customer.js.map
