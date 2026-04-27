if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    __name: "Mbutton",
    props: {
      content: String
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "button",
        { class: "content" },
        vue.toDisplayString($props.content),
        1
        /* TEXT */
      )
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-c10ecb9a"], ["__file", "D:/html/MT SCM/components/Mbutton/Mbutton.vue"]]);
  const _sfc_main$8 = {
    onLoad() {
      uni.hideTabBar();
    },
    // welcome.vue
    methods: {
      handleStart() {
        try {
          uni.setStorageSync("hasShownWelcome", true);
        } catch (e) {
          formatAppLog("error", "at pages/welcome/welcome.vue:24", "存储失败:", e);
        }
        uni.switchTab({
          url: "/pages/index/index",
          success: () => {
            if (getCurrentPages().length > 1) {
              uni.reLaunch({
                url: "/pages/index/index"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/welcome/welcome.vue:39", "跳转失败:", err);
            uni.navigateBack({
              delta: 999
            });
          }
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Mbutton = resolveEasycom(vue.resolveDynamicComponent("Mbutton"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", { class: "welcome-text" }, "Welcome to MT Supply Chain Management"),
      vue.createElementVNode("navigator", { url: "/pages/login/login" }, [
        vue.createVNode(_component_Mbutton, {
          content: "开始旅程",
          class: "btn"
        }),
        vue.createCommentVNode(' <button class="start-btn" @click="handleStart">开始体验</button> ')
      ])
    ]);
  }
  const PagesWelcomeWelcome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-085f0530"], ["__file", "D:/html/MT SCM/pages/welcome/welcome.vue"]]);
  const _sfc_main$7 = {};
  function _sfc_render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(' <messageBar content="使用props的动态绑定" color="red"></messageBar> '),
      vue.createCommentVNode(' <Mbutton content="this is a button "></Mbutton> '),
      vue.createCommentVNode(" <Minput title='uid'></Minput> "),
      vue.createCommentVNode(" <Mtitle title='Login'></Mtitle> "),
      vue.createCommentVNode(" <personalCard content='123asddddddddddddddddddddddddddddasdasdasdadas'></personalCard> ")
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/html/MT SCM/pages/index/index.vue"]]);
  const _sfc_main$6 = {
    __name: "Mtitle",
    props: {
      title: String
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        { class: "title" },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      )
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-28694ee3"], ["__file", "D:/html/MT SCM/components/Mtitle/Mtitle.vue"]]);
  const _sfc_main$5 = {
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
        // 默认提示文本（未传时使用）
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const inputValue = vue.ref();
      const props = __props;
      const __returned__ = { inputValue, props, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        { class: "title" },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", null, [
        vue.withDirectives(vue.createElementVNode("input", {
          type: $props.type,
          class: "inputBox",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.inputValue = $event),
          placeholder: $props.placeholder
        }, null, 8, ["type", "placeholder"]), [
          [vue.vModelDynamic, $setup.inputValue]
        ])
      ])
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-45a5d3f9"], ["__file", "D:/html/MT SCM/components/Minput/Minput.vue"]]);
  const _sfc_main$4 = {};
  function _sfc_render$3(_ctx, _cache) {
    const _component_Mtitle = resolveEasycom(vue.resolveDynamicComponent("Mtitle"), __easycom_0);
    const _component_Minput = resolveEasycom(vue.resolveDynamicComponent("Minput"), __easycom_1$1);
    const _component_Mbutton = resolveEasycom(vue.resolveDynamicComponent("Mbutton"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "box" }, [
        vue.createVNode(_component_Mtitle, { title: "Login" }),
        vue.createVNode(_component_Minput, {
          title: "User",
          class: "input",
          placeholder: "请输入用户名"
        }),
        vue.createVNode(_component_Minput, {
          title: "password",
          class: "input",
          placeholder: "请输入用户密码",
          type: "password",
          style: { "top": "400rpx" }
        }),
        vue.createElementVNode("navigator", {
          url: "/pages/personalPage/personalPage",
          class: "btn"
        }, [
          vue.createVNode(_component_Mbutton, { content: "登录/注册并登录" })
        ])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/html/MT SCM/pages/login/login.vue"]]);
  const _imports_0 = "/static/images/avatar/1.png";
  const _sfc_main$3 = {
    __name: "personalCard",
    props: {
      content: String,
      color: {
        type: String,
        default: "#ccc"
      },
      icon: {
        type: String,
        default: ">"
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "box2" }, [
          vue.createElementVNode("view", { class: "name" }, " Marry "),
          vue.createElementVNode("img", {
            src: _imports_0,
            alt: "",
            class: "avatar"
          }),
          vue.createElementVNode("view", { class: "uid" }, " uid:213487 ")
        ]),
        vue.createElementVNode("view", {
          class: "box2",
          style: { "width": "700rpx" }
        }, [
          vue.createElementVNode("view", { class: "" }, [
            vue.createElementVNode("view", { class: "brief" }, " brief: ")
          ]),
          vue.createElementVNode(
            "view",
            { class: "content" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          ),
          vue.createElementVNode("navigator", {
            url: "/pages/index/index",
            class: "more"
          }, "more")
        ])
      ])
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-8993939d"], ["__file", "D:/html/MT SCM/components/personalCard/personalCard.vue"]]);
  const _sfc_main$2 = {
    __name: "messageBar",
    props: {
      content: String,
      color: {
        type: String,
        default: "#ccc"
      },
      icon: {
        type: String,
        default: ">"
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode(
          "view",
          {
            class: "colorLump",
            style: vue.normalizeStyle({ backgroundColor: $props.color })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          { class: "content" },
          vue.toDisplayString($props.content),
          1
          /* TEXT */
        ),
        vue.createElementVNode("i", { class: "fas fa-angle-right" })
      ])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-00f895aa"], ["__file", "D:/html/MT SCM/components/messageBar/messageBar.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    const _component_Mtitle = resolveEasycom(vue.resolveDynamicComponent("Mtitle"), __easycom_0);
    const _component_personalCard = resolveEasycom(vue.resolveDynamicComponent("personalCard"), __easycom_1);
    const _component_messageBar = resolveEasycom(vue.resolveDynamicComponent("messageBar"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_Mtitle, { content: "Home" }),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createVNode(_component_personalCard, { content: "11111111111111111111111dasdas" })
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createVNode(_component_messageBar, {
          color: "red",
          content: "customer"
        }),
        vue.createVNode(_component_messageBar, {
          color: "red",
          content: "customer"
        }),
        vue.createVNode(_component_messageBar, {
          color: "red",
          content: "customer"
        }),
        vue.createVNode(_component_messageBar, {
          color: "red",
          content: "customer"
        }),
        vue.createVNode(_component_messageBar, {
          color: "red",
          content: "customer"
        })
      ])
    ]);
  }
  const PagesPersonalPagePersonalPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-d2a21b2f"], ["__file", "D:/html/MT SCM/pages/personalPage/personalPage.vue"]]);
  __definePage("pages/welcome/welcome", PagesWelcomeWelcome);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/personalPage/personalPage", PagesPersonalPagePersonalPage);
  const _sfc_main = {
    onLaunch() {
      const hasShownWelcome = uni.getStorageSync("hasShownWelcome");
      if (!hasShownWelcome) {
        uni.reLaunch({
          url: "/pages/welcome/welcome"
        });
      } else {
        uni.switchTab({
          url: "/pages/login/login"
        });
      }
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/html/MT SCM/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
