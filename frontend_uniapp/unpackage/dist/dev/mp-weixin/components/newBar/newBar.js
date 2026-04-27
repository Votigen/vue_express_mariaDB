"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../all.min.js");
const _sfc_main = {
  __name: "newBar",
  props: {
    title: String,
    to: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: __props.to
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9de366b3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/newBar/newBar.js.map
