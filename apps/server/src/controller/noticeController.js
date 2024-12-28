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
var noticeController_exports = {};
__export(noticeController_exports, {
  createNotice: () => createNotice,
  deleteNotice: () => deleteNotice,
  getAllNotices: () => getAllNotices,
  getNoticeById: () => getNoticeById,
  updateNotice: () => updateNotice
});
module.exports = __toCommonJS(noticeController_exports);
var import_noticeModle = __toESM(require("../model/noticeModle"));
var import_responseUtils = require("../utils/responseUtils");
const createNotice = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return (0, import_responseUtils.sendResponse)(res, "Please fill all the details", null, false, 400);
    }
    console.log(name, email, phone);
    const notice = new import_noticeModle.default({
      name,
      email,
      phone
    });
    await notice.save();
    return (0, import_responseUtils.sendResponse)(res, "Notice created successfully", notice);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllNotices = async (req, res) => {
  try {
    const notices = await import_noticeModle.default.find().select("-createdAt -updatedAt -__v").sort({ noticeDate: -1 });
    return (0, import_responseUtils.sendResponse)(res, "Notices fetched successfully", notices);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await import_noticeModle.default.findById(id).select(
      "-createdAt -updatedAt -__v"
    );
    if (!notice) {
      return (0, import_responseUtils.sendResponse)(res, "Notice not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Notices fetched successfully", notice);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    console.log(req.body);
    const updatedNotice = await import_noticeModle.default.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    console.log(updateNotice);
    if (!updatedNotice) {
      return (0, import_responseUtils.sendResponse)(res, "Notice not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Notice updated successfully", updatedNotice);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await import_noticeModle.default.findByIdAndDelete(id);
    if (!deletedNotice) {
      return (0, import_responseUtils.sendResponse)(res, "Notice not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Notice deleted successfully", deletedNotice);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNotice,
  deleteNotice,
  getAllNotices,
  getNoticeById,
  updateNotice
});
