"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../all.min.js");
const _sfc_main = {
  __name: "order",
  props: {
    title: String,
    customer: String,
    content: String,
    to: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.t(__props.customer),
        c: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dddfbfee"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/order/order.js.map
