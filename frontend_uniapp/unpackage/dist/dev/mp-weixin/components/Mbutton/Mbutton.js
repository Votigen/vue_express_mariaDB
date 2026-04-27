"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Mbutton",
  props: {
    content: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10ecb9a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Mbutton/Mbutton.js.map
