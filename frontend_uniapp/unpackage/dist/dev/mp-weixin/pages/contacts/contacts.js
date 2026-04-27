"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_customer2 = common_vendor.resolveComponent("customer");
  const _easycom_newBar2 = common_vendor.resolveComponent("newBar");
  (_easycom_Mtitle2 + _easycom_customer2 + _easycom_newBar2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_customer = () => "../../components/customer/customer.js";
const _easycom_newBar = () => "../../components/newBar/newBar.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_customer + _easycom_newBar)();
}
const _sfc_main = {
  __name: "contacts",
  setup(__props) {
    const contacts = common_vendor.ref([]);
    const getContacts = async () => {
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
          url: "http://localhost:5000/api/contacts/contacts",
          method: "GET",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200) {
          common_vendor.index.__f__("log", "at pages/contacts/contacts.vue:66", "获取到的联系人数据:", res.data.data);
          contacts.value = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: "获取失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/contacts/contacts.vue:75", "获取联系人失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getContacts();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "contacts"
        }),
        b: common_vendor.f(contacts.value, (contact, k0, i0) => {
          return {
            a: contact.uid,
            b: "90a1bbf6-1-" + i0,
            c: common_vendor.p({
              customer: contact.username,
              content: contact.bio || "暂无签名",
              avatar: contact.avatar_url,
              company: contact.company
            })
          };
        }),
        c: common_vendor.p({
          title: "new",
          to: "/pages/orders/orders"
        }),
        d: common_vendor.p({
          title: "post",
          to: "/pages/orderDetails/orderDetails"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-90a1bbf6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contacts/contacts.js.map
