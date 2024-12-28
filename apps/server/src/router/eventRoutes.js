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
var eventRoutes_exports = {};
__export(eventRoutes_exports, {
  default: () => eventRoutes_default
});
module.exports = __toCommonJS(eventRoutes_exports);
var import_express = __toESM(require("express"));
var import_controller = __toESM(require("../controller"));
var import_auth = __toESM(require("../middlewares/auth"));
const router = import_express.default.Router();
router.post("/create", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EventController.createEvent);
router.get("/all", import_auth.default, import_controller.default.EventController.getEvents);
router.get("/:eventId", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EventController.getEventById);
router.put("/:eventId", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EventController.updateEvent);
router.delete("/:eventId", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EventController.deleteEvent);
router.get("/all/eventdates", import_auth.default, import_auth.hasAdminAccess, import_controller.default.EventController.getEventDates);
var eventRoutes_default = router;
