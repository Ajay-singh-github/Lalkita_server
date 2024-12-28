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
var userRoutes_exports = {};
__export(userRoutes_exports, {
  default: () => userRoutes_default
});
module.exports = __toCommonJS(userRoutes_exports);
var import_express = __toESM(require("express"));
var import_controller = __toESM(require("../controller"));
var import_auth = __toESM(require("../middlewares/auth"));
const router = import_express.default.Router();
router.route("/signup").post(import_controller.default.UserController.createUser);
router.route("/update-profile").post(import_controller.default.UserController.updateProfile);
router.route("/login").post(import_controller.default.UserController.userLogin);
router.route("/update").patch(import_auth.default, import_controller.default.UserController.updateUserById);
router.route("/forgot-password").post(import_controller.default.UserController.forgotPassword);
router.route("/getAllUsers").get(import_auth.default, import_auth.hasAdminAccess, import_controller.default.UserController.getAllUsers);
router.route("/search").get(import_auth.default, import_auth.hasAdminAccess, import_controller.default.UserController.searchUsers);
router.route("/:userId").get(import_auth.default, import_controller.default.UserController.getUserById);
router.route("/delete").delete(import_auth.default, import_auth.hasAdminAccess, import_controller.default.UserController.deleteUser);
var userRoutes_default = router;
