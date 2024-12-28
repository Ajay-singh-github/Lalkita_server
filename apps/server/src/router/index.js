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
var router_exports = {};
__export(router_exports, {
  default: () => router_default
});
module.exports = __toCommonJS(router_exports);
var import_express = __toESM(require("express"));
var import_userRoutes = __toESM(require("./userRoutes"));
var import_eventRoutes = __toESM(require("./eventRoutes"));
var import_noticeRoutes = __toESM(require("./noticeRoutes"));
var import_assignmentRoutes = __toESM(require("./assignmentRoutes"));
var import_ebooksRoutes = __toESM(require("./ebooksRoutes"));
var import_cousesRoutes = __toESM(require("./cousesRoutes"));
var import_meetRoutes = __toESM(require("./meetRoutes"));
var import_commonRoutes = __toESM(require("./commonRoutes"));
var import_purchaseRoutes = __toESM(require("./purchaseRoutes"));
var import_youtubeRoutes = __toESM(require("./youtubeRoutes"));
var import_certificateRoutes = __toESM(require("./certificateRoutes"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  return res.status(200).send({
    uptime: process.uptime(),
    message: "Lal Kitab API health check :: GOOD",
    timestamp: Date.now()
  });
});
router.use("/users", import_userRoutes.default);
router.use("/admin/meet", import_meetRoutes.default);
router.use("/admin/events", import_eventRoutes.default);
router.use("/common", import_commonRoutes.default);
router.use("/admin/notices", import_noticeRoutes.default);
router.use("/assignments", import_assignmentRoutes.default);
router.use("/admin/ebooks", import_ebooksRoutes.default);
router.use("/admin/courses", import_cousesRoutes.default);
router.use("/purchase", import_purchaseRoutes.default);
router.use("/youtube", import_youtubeRoutes.default);
router.use("/certificate", import_certificateRoutes.default);
var router_default = router;
