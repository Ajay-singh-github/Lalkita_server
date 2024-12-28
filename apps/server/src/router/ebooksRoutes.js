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
var ebooksRoutes_exports = {};
__export(ebooksRoutes_exports, {
  default: () => ebooksRoutes_default
});
module.exports = __toCommonJS(ebooksRoutes_exports);
var import_express = __toESM(require("express"));
var import_controller = __toESM(require("../controller"));
var import_auth = __toESM(require("../middlewares/auth"));
var import_storage = require("../utils/storage");
const router = import_express.default.Router();
router.post(
  "/new/upload",
  (0, import_storage.uploadMultiFile)([{
    name: "uploadedFile",
    maxCount: 1
  }, {
    name: "thumbnailUrl",
    maxCount: 1
  }]),
  import_auth.default,
  import_auth.hasAdminAccess,
  import_controller.default.EbooksController.createEbook
);
router.get("/all/:category", import_controller.default.EbooksController.getAllEbooksbyCategory);
router.get("/", import_controller.default.EbooksController.getAllEbooks);
router.get("/:id", import_controller.default.EbooksController.getEbookById);
router.put(
  "/:id",
  (0, import_storage.uploadMultiFile)([
    {
      name: "uploadedFile",
      maxCount: 1
    },
    {
      name: "thumbnailUrl",
      maxCount: 1
    }
  ]),
  import_auth.default,
  import_auth.hasAdminAccess,
  import_controller.default.EbooksController.updateEbook
);
router.delete("/:id", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EbooksController.deleteEbook);
var ebooksRoutes_default = router;
