"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_jwt = require("../../utils/jwt.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_orderDetail2 = common_vendor.resolveComponent("orderDetail");
  const _easycom_personalCard2 = common_vendor.resolveComponent("personalCard");
  (_easycom_Mtitle2 + _easycom_orderDetail2 + _easycom_personalCard2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_orderDetail = () => "../../components/orderDetail/orderDetail.js";
const _easycom_personalCard = () => "../../components/personalCard/personalCard.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_orderDetail + _easycom_personalCard)();
}
const _sfc_main = {
  __name: "orderDetails",
  setup(__props) {
    const loading = common_vendor.ref(true);
    const orderData = common_vendor.ref(null);
    const userInfo = common_vendor.ref({});
    common_vendor.onLoad(async (options) => {
      const orderId = options.orderId;
      common_vendor.index.__f__("log", "at pages/orderDetails/orderDetails.vue:54", "✅ 接收到的 orderId:", orderId);
      if (!orderId) {
        common_vendor.index.showToast({
          title: "缺少订单ID",
          icon: "none"
        });
        return;
      }
      await getOrderDetail(orderId);
      await getUserInfo();
    });
    const getOrderDetail = async (orderId) => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      try {
        const res = await common_vendor.index.request({
          url: `http://localhost:5000/api/orders/orderss/${orderId}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200) {
          const data = res.data;
          if (Array.isArray(data)) {
            common_vendor.index.__f__("warn", "at pages/orderDetails/orderDetails.vue:95", "⚠️ 后端返回了数组，但预期是对象:", data);
            const matched = data.find((item) => item.order_id === orderId);
            if (matched) {
              orderData.value = matched;
            } else {
              common_vendor.index.showToast({
                title: "订单未找到",
                icon: "none"
              });
            }
          } else {
            orderData.value = data;
          }
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/orderDetails/orderDetails.vue:116", "❌ 请求订单详情失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    const getUserInfo = async () => {
      loading.value = true;
      try {
        const token = common_vendor.index.getStorageSync("token");
        const decoded = utils_jwt.decodeToken(token);
        if (!decoded)
          return;
        const userId = orderData.value.creator_uid;
        if (!token) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        const res = await common_vendor.index.request({
          url: `http://localhost:5000/api/users/public/${userId}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200) {
          userInfo.value = res.data;
          common_vendor.index.__f__("log", "at pages/orderDetails/orderDetails.vue:154", "用户信息:", res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "获取失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/orderDetails/orderDetails.vue:162", "获取用户信息失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "订单详情"
        }),
        b: !orderData.value
      }, !orderData.value ? {} : common_vendor.e({
        c: orderData.value.order_id
      }, orderData.value.order_id ? {
        d: common_vendor.p({
          order_id: orderData.value.order_id,
          status: orderData.value.order_status,
          product: orderData.value.product_id,
          number: orderData.value.quantity,
          singlePrice: orderData.value.unit_price,
          startDate: orderData.value.created_at,
          endDate: orderData.value.end_at,
          totalPrice: orderData.value.total_price
        })
      } : {}, {
        e: orderData.value.order_id
      }, orderData.value.order_id ? {
        f: common_vendor.p({
          name: userInfo.value.username,
          uid: userInfo.value.uid,
          content: userInfo.value.bio || "暂无简介"
        })
      } : {}), {
        g: orderData.value === null
      }, orderData.value === null ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac9b5633"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orderDetails/orderDetails.js.map
