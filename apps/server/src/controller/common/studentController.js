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
var studentController_exports = {};
__export(studentController_exports, {
  getAllStudentsNotices: () => getAllStudentsNotices,
  getStudentAdmissionData: () => getStudentAdmissionData
});
module.exports = __toCommonJS(studentController_exports);
var import_responseUtils = require("../../utils/responseUtils");
var import_model = __toESM(require("../../model"));
const getStudentAdmissionData = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return (0, import_responseUtils.sendResponse)(res, "User ID is required", null, false, 400);
    }
    const student = await import_model.default.User.findById({
      userId
    });
    if (!student) {
      return (0, import_responseUtils.sendResponse)(res, "Student not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Student data fetched successfully", student);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllStudentsNotices = async (req, res) => {
  try {
    const notices = await import_model.default.Notice.find({
      recipients: { $in: ["user", "both"] }
    }).select(" -updatedAt -__v").sort({ noticeDate: -1 });
    return (0, import_responseUtils.sendResponse)(res, "Students Notices fetched successfully", notices);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllStudentsNotices,
  getStudentAdmissionData
});
