"use strict";
const common_vendor = require("../common/vendor.js");
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload)
      return null;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    common_vendor.index.__f__("error", "at utils/jwt.js:9", "JWT 解码失败:", error);
    return null;
  }
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/jwt.js.map
