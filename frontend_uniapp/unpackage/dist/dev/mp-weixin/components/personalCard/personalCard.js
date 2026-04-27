"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "personalCard",
  props: {
    name: {
      type: String,
      default: ""
    },
    uid: {
      type: [String, Number],
      default: "---"
    },
    content: {
      type: String,
      default: "暂无简介"
    },
    color: {
      type: String,
      default: "#ccc"
    },
    icon: {
      type: String,
      default: ">"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.name),
        b: common_assets._imports_0,
        c: common_vendor.t(__props.uid),
        d: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8993939d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/personalCard/personalCard.js.map
