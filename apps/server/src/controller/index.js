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
var controller_exports = {};
__export(controller_exports, {
  default: () => controller_default
});
module.exports = __toCommonJS(controller_exports);
var UserController = __toESM(require("./userController"));
var CommonMasterController = __toESM(require("./common/masterController"));
var CommonStudentController = __toESM(require("./common/studentController"));
var CommonteacherController = __toESM(require("./common/adminController"));
var EventController = __toESM(require("./eventController"));
var NoticeController = __toESM(require("./noticeController"));
var AssignmentController = __toESM(require("./assignmentController"));
var EbooksController = __toESM(require("./ebookController"));
var CoursesController = __toESM(require("./courseController"));
var PurchaseController = __toESM(require("./purchaseController"));
var YouTubeController = __toESM(require("./youtubeController"));
var controller_default = {
  UserController,
  CommonMasterController,
  CommonStudentController,
  CommonteacherController,
  EventController,
  NoticeController,
  AssignmentController,
  EbooksController,
  CoursesController,
  PurchaseController,
  YouTubeController
  // PaymentController
};
