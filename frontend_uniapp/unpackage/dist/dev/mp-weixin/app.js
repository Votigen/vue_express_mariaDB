"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/welcome/welcome.js";
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/personalPage/personalPage.js";
  "./pages/buy/buy.js";
  "./pages/supply/supply.js";
  "./pages/orders/orders.js";
  "./pages/contacts/contacts.js";
  "./pages/stocks/stocks.js";
  "./pages/NewOrder/NewOrder.js";
  "./pages/orderDetails/orderDetails.js";
  "./pages/editPersonal/editPersonal.js";
  "./pages/customerDetails/customerDetails.js";
  "./pages/stockDetails/stockDetails.js";
  "./pages/NewContact/NewContact.js";
}
const _sfc_main = {
  onLaunch() {
    const hasShownWelcome = common_vendor.index.getStorageSync("hasShownWelcome");
    if (!hasShownWelcome) {
      common_vendor.index.reLaunch({
        url: "/pages/welcome/welcome"
      });
    } else {
      common_vendor.index.switchTab({
        url: "/pages/login/login"
      });
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
