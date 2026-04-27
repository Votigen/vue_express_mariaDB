"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Mtitle2 = common_vendor.resolveComponent("Mtitle");
  const _easycom_Minput2 = common_vendor.resolveComponent("Minput");
  const _easycom_Mbutton2 = common_vendor.resolveComponent("Mbutton");
  (_easycom_Mtitle2 + _easycom_Minput2 + _easycom_Mbutton2)();
}
const _easycom_Mtitle = () => "../../components/Mtitle/Mtitle.js";
const _easycom_Minput = () => "../../components/Minput/Minput.js";
const _easycom_Mbutton = () => "../../components/Mbutton/Mbutton.js";
if (!Math) {
  (_easycom_Mtitle + _easycom_Minput + _easycom_Mbutton)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = async () => {
      common_vendor.index.__f__("log", "at pages/login/login.vue:28", "📤 登录请求数据:", {
        username: username.value,
        password: password.value
      });
      if (!username.value || !password.value) {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return;
      }
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:5000/api/login/login",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            username: username.value,
            password: password.value
          }
        });
        const {
          statusCode,
          data
        } = res;
        if (statusCode === 200 && data.token) {
          common_vendor.index.setStorageSync("token", data.token);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/personalPage/personalPage"
            });
          }, 1e3);
        } else {
          common_vendor.index.showToast({
            title: data.message || "登录失败",
            icon: "none"
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:76", "Login error:", err);
        common_vendor.index.showToast({
          title: "网络错误或服务器无响应",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "Login"
        }),
        b: common_vendor.o(($event) => username.value = $event),
        c: common_vendor.p({
          title: "User",
          placeholder: "请输入用户名",
          modelValue: username.value
        }),
        d: common_vendor.o(($event) => password.value = $event),
        e: common_vendor.p({
          title: "Password",
          placeholder: "请输入用户密码",
          type: "password",
          modelValue: password.value
        }),
        f: common_vendor.p({
          content: "登录"
        }),
        g: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
