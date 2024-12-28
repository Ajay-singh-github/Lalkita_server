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
var cousesRoutes_exports = {};
__export(cousesRoutes_exports, {
  default: () => cousesRoutes_default
});
module.exports = __toCommonJS(cousesRoutes_exports);
var import_express = __toESM(require("express"));
var import_controller = __toESM(require("../controller"));
var import_auth = __toESM(require("../middlewares/auth"));
var import_storage = require("../utils/storage");
const router = import_express.default.Router();
router.post(
  "/add",
  import_auth.default,
  import_auth.hasAdminAccess,
  (0, import_storage.uploadFile)("thumbnailFile"),
  import_controller.default.CoursesController.createCourse
);
router.get("/all", import_controller.default.CoursesController.getAllCourses);
router.get(
  "/all/:category",
  import_controller.default.CoursesController.getCoursesByCategory
);
router.get(
  "/:id",
  import_controller.default.CoursesController.getCourseById
);
router.put(
  "/:id",
  import_auth.default,
  import_auth.hasAdminAccess,
  (0, import_storage.uploadFile)("thumbnailFile"),
  import_controller.default.CoursesController.updateCourse
);
router.delete(
  "/:id",
  import_auth.default,
  import_auth.hasAdminAccess,
  import_controller.default.CoursesController.deleteCourse
);
var cousesRoutes_default = router;
