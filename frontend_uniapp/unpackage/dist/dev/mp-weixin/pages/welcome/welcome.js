"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // welcome.vue
  methods: {
    handleStart() {
      try {
        common_vendor.index.setStorageSync("hasShownWelcome", true);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/welcome/welcome.vue:20", "存储失败:", e);
      }
      common_vendor.index.switchTab({
        url: "/pages/index/index",
        success: () => {
          if (getCurrentPages().length > 1) {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/welcome/welcome.vue:35", "跳转失败:", err);
          common_vendor.index.navigateBack({
            delta: 999
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_Mbutton2 = common_vendor.resolveComponent("Mbutton");
  _easycom_Mbutton2();
}
const _easycom_Mbutton = () => "../../components/Mbutton/Mbutton.js";
if (!Math) {
  _easycom_Mbutton();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      content: "开始旅程"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-085f0530"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/welcome/welcome.js.map
