"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../all.min.js");
const _sfc_main = {
  __name: "messageBar",
  props: {
    content: String,
    color: {
      type: String,
      default: "#ccc"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.color,
        b: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00f895aa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/messageBar/messageBar.js.map
