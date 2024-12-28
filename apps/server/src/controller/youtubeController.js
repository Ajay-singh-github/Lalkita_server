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
var youtubeController_exports = {};
__export(youtubeController_exports, {
  createYouTube: () => createYouTube,
  deleteYouTube: () => deleteYouTube,
  getYouTube: () => getYouTube,
  getYouTubeByCourse: () => getYouTubeByCourse,
  getYouTubeById: () => getYouTubeById,
  updateYouTube: () => updateYouTube
});
module.exports = __toCommonJS(youtubeController_exports);
var import_model = __toESM(require("../model"));
var import_responseUtils = require("../utils/responseUtils");
const createYouTube = async (req, res) => {
  try {
    const { title, description, link, courseId } = req.body;
    if (!title || !description || !link || !courseId) {
      return (0, import_responseUtils.sendResponse)(res, "Please fill all the details", null, false, 400);
    }
    const youtube = await import_model.default.YouTube.create({
      title,
      description,
      link,
      courseId
    });
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "Youtube not created", null, false, 400);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube created successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getYouTube = async (req, res) => {
  try {
    const youtube = await import_model.default.YouTube.find();
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "No YouTube found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube fetched successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getYouTubeById = async (req, res) => {
  try {
    const { id } = req.params;
    const youtube = await import_model.default.YouTube.findById(id);
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "No YouTube found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube fetched successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateYouTube = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, courseId } = req.body;
    if (!title || !description || !link || !courseId) {
      return (0, import_responseUtils.sendResponse)(res, "Please fill all the details", null, false, 400);
    }
    const youtube = await import_model.default.YouTube.findByIdAndUpdate(
      id,
      { title, description, link, courseId },
      { new: true }
    );
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "Youtube not created", null, false, 400);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube created successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteYouTube = async (req, res) => {
  try {
    const { id } = req.params;
    const youtube = await import_model.default.YouTube.findByIdAndDelete(id);
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "Youtube not created", null, false, 400);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube deleted successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getYouTubeByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const youtube = await import_model.default.YouTube.find({ courseId });
    if (!youtube) {
      return (0, import_responseUtils.sendResponse)(res, "Youtube not created", null, false, 400);
    }
    return (0, import_responseUtils.sendResponse)(res, "Youtube created successfully", youtube, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createYouTube,
  deleteYouTube,
  getYouTube,
  getYouTubeByCourse,
  getYouTubeById,
  updateYouTube
});