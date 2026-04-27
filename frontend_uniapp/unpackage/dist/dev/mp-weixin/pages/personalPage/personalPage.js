"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_jwt = require("../../utils/jwt.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_personalCard2 = common_vendor.resolveComponent("personalCard");
  const _easycom_messageBar2 = common_vendor.resolveComponent("messageBar");
  (_easycom_Mtitle2 + _easycom_personalCard2 + _easycom_messageBar2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_personalCard = () => "../../components/personalCard/personalCard.js";
const _easycom_messageBar = () => "../../components/messageBar/messageBar.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_personalCard + _easycom_messageBar)();
}
const _sfc_main = {
  __name: "personalPage",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const loading = common_vendor.ref(true);
    const getUserInfo = async () => {
      loading.value = true;
      try {
        const token = common_vendor.index.getStorageSync("token");
        const decoded = utils_jwt.decodeToken(token);
        if (!decoded)
          return;
        const userId = decoded.userId || decoded.uid || decoded.id;
        if (!token) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        const res = await common_vendor.index.request({
          url: `http://localhost:5000/api/users/users/${userId}`,
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200) {
          userInfo.value = res.data;
          common_vendor.index.__f__("log", "at pages/personalPage/personalPage.vue:89", "用户信息:", res.data.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.message || "获取失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/personalPage/personalPage.vue:97", "获取用户信息失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "Home"
        }),
        b: loading.value
      }, loading.value ? {} : {
        c: common_vendor.p({
          name: userInfo.value.username,
          uid: userInfo.value.uid,
          content: userInfo.value.brief || "暂无简介"
        })
      }, {
        d: common_vendor.p({
          color: "#ff5733",
          content: "联系人"
        }),
        e: common_vendor.p({
          color: "#ac33c1",
          content: "购买订单"
        }),
        f: common_vendor.p({
          color: "#00baad",
          content: "供应订单"
        }),
        g: common_vendor.p({
          color: "#d43030",
          content: "全部订单"
        }),
        h: common_vendor.p({
          color: "#2a82e4",
          content: "库存"
        }),
        i: common_vendor.p({
          color: "#ffeb3b",
          content: "创建联系人"
        }),
        j: common_vendor.p({
          color: "#a5d63f",
          content: "创建订单"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d2a21b2f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personalPage/personalPage.js.map
