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
var assignmentController_exports = {};
__export(assignmentController_exports, {
  createAssignment: () => createAssignment,
  deleteAssignmentById: () => deleteAssignmentById,
  getAllAssignments: () => getAllAssignments,
  getAssignmentByCourseId: () => getAssignmentByCourseId,
  getAssignmentById: () => getAssignmentById,
  updateAssignmentById: () => updateAssignmentById
});
module.exports = __toCommonJS(assignmentController_exports);
var import_model = __toESM(require("../model"));
var import_responseUtils = require("../utils/responseUtils");
var import_storage = require("../utils/storage");
var import_console = require("console");
const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    console.log(req.body);
    if (!req.file)
      throw (0, import_console.error)("no file uploaded");
    const locaFilePath = req.file.path;
    if (!title || !description || !courseId) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Please fill in all assignment details",
        null,
        false,
        400
      );
    }
    const cloudinaryResult = await (0, import_storage.uploadToCloudinary)(locaFilePath);
    const assignmentData = new import_model.default.Assignment({
      title,
      description,
      courseId,
      uploadedFileUrl: cloudinaryResult.url
    });
    const newAssignment = await assignmentData.save();
    return (0, import_responseUtils.sendResponse)(res, "Assignment created successfully", newAssignment);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await import_model.default.Assignment.find().populate("courseId", "title");
    if (!assignments) {
      return (0, import_responseUtils.sendResponse)(res, "No assignments found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(
      res,
      "Assignments fetched successfully",
      assignments,
      true,
      200
    );
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    console.log(assignmentId);
    const assignment = await import_model.default.Assignment.findById(assignmentId).select(
      "-__v -updatedAt -createdAt"
    );
    if (!assignment) {
      return (0, import_responseUtils.sendResponse)(res, "Assignment not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Assignment fetched successfully", assignment);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAssignmentByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignment = await import_model.default.Assignment.find({ courseId }).populate("courseId", "title");
    if (!assignment) {
      return (0, import_responseUtils.sendResponse)(res, "Assignment not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Assignment fetched successfully", assignment);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateAssignmentById = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const updatedAssignment = await import_model.default.Assignment.findByIdAndUpdate(
      assignmentId,
      req.body,
      { new: true }
    );
    if (!updatedAssignment) {
      return (0, import_responseUtils.sendResponse)(res, "Assignment not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(
      res,
      "Assignment updated successfully",
      updatedAssignment,
      true,
      200
    );
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteAssignmentById = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const deletedAssignment = await import_model.default.Assignment.findByIdAndDelete(
      assignmentId
    );
    if (!deletedAssignment) {
      return (0, import_responseUtils.sendResponse)(res, "Assignment not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(
      res,
      "Assignment deleted successfully",
      null,
      true,
      200
    );
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAssignment,
  deleteAssignmentById,
  getAllAssignments,
  getAssignmentByCourseId,
  getAssignmentById,
  updateAssignmentById
});
