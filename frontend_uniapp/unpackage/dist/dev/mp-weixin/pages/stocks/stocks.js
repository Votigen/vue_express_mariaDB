"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_stockBar2 = common_vendor.resolveComponent("stockBar");
  const _easycom_newBar2 = common_vendor.resolveComponent("newBar");
  (_easycom_Mtitle2 + _easycom_stockBar2 + _easycom_newBar2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_stockBar = () => "../../components/stockBar/stockBar.js";
const _easycom_newBar = () => "../../components/newBar/newBar.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_stockBar + _easycom_newBar)();
}
const _sfc_main = {
  __name: "stocks",
  setup(__props) {
    const inventory = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const getStockStatus = (quantity, threshold) => {
      if (quantity === 0)
        return "缺货";
      if (!threshold)
        return "无阈值";
      if (quantity <= threshold)
        return "库存预警";
      if (quantity <= threshold * 2)
        return "库存偏低";
      return "库存正常";
    };
    const getStockColor = (quantity, threshold) => {
      if (!threshold)
        return "blue";
      if (quantity === 0)
        return "gray";
      if (quantity <= threshold)
        return "red";
      if (quantity <= threshold * 2)
        return "orange";
      return "green";
    };
    const getMyInventory = async () => {
      loading.value = true;
      try {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        const res = await common_vendor.index.request({
          url: "http://localhost:5000/api/inventory/inventory",
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200) {
          inventory.value = res.data.data;
          common_vendor.index.__f__("log", "at pages/stocks/stocks.vue:90", "获取到的库存:", res.data.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "获取库存失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/stocks/stocks.vue:98", "获取失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      getMyInventory();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "Stock"
        }),
        b: loading.value
      }, loading.value ? {} : inventory.value.length === 0 ? {} : {}, {
        c: inventory.value.length === 0,
        d: common_vendor.f(inventory.value, (product, k0, i0) => {
          return {
            a: product.product_id,
            b: "ee6688c1-1-" + i0,
            c: common_vendor.p({
              title: product.product_name,
              color: getStockColor(product.quantity, product.alert_threshold),
              content: `数量: ${product.quantity}`,
              status: getStockStatus(product.quantity, product.alert_threshold)
            })
          };
        }),
        e: common_vendor.p({
          title: "new",
          to: "/pages/orders/orders"
        }),
        f: common_vendor.p({
          title: "post",
          to: "/pages/orderDetails/orderDetails"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee6688c1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/stocks/stocks.js.map
