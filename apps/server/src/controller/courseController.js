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
var courseController_exports = {};
__export(courseController_exports, {
  createCourse: () => createCourse,
  deleteCourse: () => deleteCourse,
  getAllCourses: () => getAllCourses,
  getCourseById: () => getCourseById,
  getCoursesByCategory: () => getCoursesByCategory,
  updateCourse: () => updateCourse
});
module.exports = __toCommonJS(courseController_exports);
var import_coursesModle = __toESM(require("../model/coursesModle"));
var import_responseUtils = require("../utils/responseUtils");
var import_console = require("console");
var import_storage = require("../utils/storage");
const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      status,
      tags,
      language,
      price,
      rating,
      syllabusUrl,
      duration,
      durationUnit,
      lectureCount,
      lectureDuration
    } = req.body;
    if (!req.file)
      throw (0, import_console.error)("No file uploaded");
    const thumbnailFile = req.file.path;
    const thumbnailUrlcloudinaryResult = await (0, import_storage.uploadToCloudinary)(
      thumbnailFile
    );
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    const newCourse = new import_coursesModle.default({
      title,
      description,
      category,
      status,
      tags: tagsArray,
      language,
      price,
      thumbnailUrl: thumbnailUrlcloudinaryResult.url,
      rating,
      syllabusUrl,
      duration,
      durationUnit,
      lectureCount,
      lectureDuration
    });
    const savedCourse = await newCourse.save();
    if (!savedCourse) {
      return (0, import_responseUtils.sendResponse)(res, "Course not created", null, false, 400);
    }
    return (0, import_responseUtils.sendResponse)(res, "Course created successfully", savedCourse);
  } catch (error2) {
    next(error2);
  }
};
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await import_coursesModle.default.find().select(" -createdAt -updatedAt -__v");
    return (0, import_responseUtils.sendResponse)(res, "Courses retrieved successfully", courses);
  } catch (error2) {
    next(error2);
  }
};
const getCoursesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const courses = await import_coursesModle.default.find({ category }).select(
      "-createdAt -updatedAt -__v"
    );
    if (!courses) {
      return (0, import_responseUtils.sendResponse)(res, "Course not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Courses retrieved successfully", courses);
  } catch (error2) {
    return (0, import_responseUtils.sendResponse)(res, "Course not retrieved/found", null, false, 500);
  }
};
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await import_coursesModle.default.findById(id).select(" -createdAt -updatedAt -__v");
    if (!course) {
      return (0, import_responseUtils.sendResponse)(res, "Course not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Course retrieved successfully", course);
  } catch (error2) {
    next(error2);
  }
};
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    let thumbnailUrlcloudinaryResult = null;
    if (req.file) {
      const thumbnailFile = req.file.path;
      thumbnailUrlcloudinaryResult = await (0, import_storage.uploadToCloudinary)(thumbnailFile);
    }
    const updatedCourse = await import_coursesModle.default.findByIdAndUpdate(
      id,
      { ...updatedData, thumbnailUrl: thumbnailUrlcloudinaryResult?.url },
      { new: true }
    );
    if (!updatedCourse) {
      return (0, import_responseUtils.sendResponse)(res, "Course not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Course updated successfully", updatedCourse);
  } catch (error2) {
    next(error2);
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await import_coursesModle.default.findByIdAndDelete(id);
    if (!deletedCourse) {
      return (0, import_responseUtils.sendResponse)(res, "Course not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Course deleted successfully", deletedCourse);
  } catch (error2) {
    next(error2);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  updateCourse
});
