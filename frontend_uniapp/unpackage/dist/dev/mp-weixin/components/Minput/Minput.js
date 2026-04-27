"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Minput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    title: String,
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    // 👇 必须接收来自父组件的 v-model 值
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleInput = (e) => {
      var _a, _b;
      const value = ((_a = e.detail) == null ? void 0 : _a.value) || ((_b = e.target) == null ? void 0 : _b.value) || "";
      emit("update:modelValue", value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: __props.type,
        c: __props.modelValue,
        d: common_vendor.o(handleInput),
        e: __props.placeholder
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45a5d3f9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Minput/Minput.js.map
