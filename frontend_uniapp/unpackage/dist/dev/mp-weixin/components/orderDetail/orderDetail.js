"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "orderDetail",
  props: {
    order_id: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: ""
    },
    product: {
      type: String,
      default: ""
    },
    number: {
      type: Number,
      default: ""
    },
    singlePrice: {
      type: Number,
      default: ""
    },
    totalPrice: {
      type: Number,
      default: ""
    },
    startDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const getStatusColor = (status) => {
      if (!status)
        return "#999";
      if (status.includes("completed"))
        return "#4CAF50";
      if (status.includes("processing") || status.includes("pending"))
        return "#2196F3";
      if (status.includes("cancelled"))
        return "#F44336";
      return "#FF9800";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.order_id),
        b: getStatusColor(__props.status),
        c: common_vendor.t(__props.status),
        d: common_vendor.t(__props.product),
        e: common_vendor.t(__props.number),
        f: common_vendor.t(__props.singlePrice),
        g: common_vendor.t(__props.totalPrice),
        h: common_vendor.t(__props.startDate),
        i: common_vendor.t(__props.endDate)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b104ae4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/orderDetail/orderDetail.js.map
