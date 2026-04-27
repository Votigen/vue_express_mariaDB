"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_orderDetail2 = common_vendor.resolveComponent("orderDetail");
  _easycom_orderDetail2();
}
const _easycom_orderDetail = () => "../../components/orderDetail/orderDetail.js";
if (!Math) {
  _easycom_orderDetail();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      order_id: "1"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1acc51a1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orders/orders.js.map
