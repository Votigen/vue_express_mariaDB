"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../all.min.js");
const _sfc_main = {
  __name: "stockBar",
  props: {
    title: String,
    customer: String,
    content: String,
    to: String,
    status: String,
    color: {
      type: String,
      default: "#ccc"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: __props.color,
        c: common_vendor.t(__props.status),
        d: common_vendor.t(__props.content),
        e: __props.to
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f17c347b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/stockBar/stockBar.js.map
