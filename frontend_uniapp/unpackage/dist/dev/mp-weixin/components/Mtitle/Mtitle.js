"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Mtitle",
  props: {
    title: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28694ee3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Mtitle/Mtitle.js.map
