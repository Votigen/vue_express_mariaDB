"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_order2 = common_vendor.resolveComponent("order");
  const _easycom_newBar2 = common_vendor.resolveComponent("newBar");
  (_easycom_Mtitle2 + _easycom_order2 + _easycom_newBar2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_order = () => "../../components/order/order.js";
const _easycom_newBar = () => "../../components/newBar/newBar.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_order + _easycom_newBar)();
}
const _sfc_main = {
  __name: "supply",
  setup(__props) {
    const orders = common_vendor.ref([]);
    const loading = common_vendor.ref(true);
    const getMyOrders = async () => {
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
          url: "http://localhost:5000/api/orders/supply",
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200 && res.data.success) {
          orders.value = res.data.data;
          common_vendor.index.__f__("log", "at pages/supply/supply.vue:79", "获取到的订单数据:", res.data.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "获取失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/supply/supply.vue:87", "获取订单失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      getMyOrders();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "Supply"
        }),
        b: loading.value
      }, loading.value ? {} : orders.value.length === 0 ? {} : {}, {
        c: orders.value.length === 0,
        d: common_vendor.f(orders.value, (order, k0, i0) => {
          return {
            a: order.order_id,
            b: "80112fae-1-" + i0,
            c: common_vendor.p({
              title: order.title,
              customer: order.customer_username || "未知客户",
              content: order.description || "暂无描述"
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80112fae"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/supply/supply.js.map
