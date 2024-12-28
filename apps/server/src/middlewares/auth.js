var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default,
  hasAdminAccess: () => hasAdminAccess,
  isAuthenticated: () => isAuthenticated
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_userModel = __toESM(require("../model/userModel"));
var import_responseUtils = require("../utils/responseUtils");
const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return (0, import_responseUtils.sendResponse)(res, "Token is requride", null, false, 403);
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    const user = await import_userModel.default.findById(decoded.id);
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    req.user = user;
    return next();
  } catch (error) {
    return (0, import_responseUtils.sendResponse)(res, "Token is not valid, or it's expired", null, false, 403);
  }
};
const hasAdminAccess = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    if (user.role === "admin") {
      return next();
    } else {
      return (0, import_responseUtils.sendResponse)(res, "Insufficient privileges. Admin access required.", null, false, 403);
    }
  } catch (error) {
    return (0, import_responseUtils.sendResponse)(res, "Error checking admin access", null, false, 500);
  }
};
var auth_default = isAuthenticated;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasAdminAccess,
  isAuthenticated
});
