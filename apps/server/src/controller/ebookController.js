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
var ebookController_exports = {};
__export(ebookController_exports, {
  createEbook: () => createEbook,
  deleteEbook: () => deleteEbook,
  getAllEbooks: () => getAllEbooks,
  getAllEbooksbyCategory: () => getAllEbooksbyCategory,
  getEbookById: () => getEbookById,
  updateEbook: () => updateEbook
});
module.exports = __toCommonJS(ebookController_exports);
var import_ebookModle = __toESM(require("../model/ebookModle"));
var import_responseUtils = require("../utils/responseUtils");
var import_storage = require("../utils/storage");
var import_console = require("console");
const createEbook = async (req, res) => {
  try {
    const {
      title,
      description,
      author,
      category,
      tags,
      // classId,
      // subjectId,
      // language,
      price,
      status
    } = req.body;
    if (!req.files)
      throw (0, import_console.error)("No file uploaded");
    const locaFilePath = req.files.uploadedFile[0].path;
    const locaFilePath2 = req.files.thumbnailUrl[0].path;
    if (!title || !description || !author || !category || !status) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Please fill in all required ebook details",
        null,
        false,
        400
      );
    }
    const cloudinaryResult = await (0, import_storage.uploadToCloudinary)(locaFilePath);
    const cloudinaryResult2 = await (0, import_storage.uploadToCloudinary)(locaFilePath2);
    const ebook = new import_ebookModle.default({
      title,
      description,
      author,
      category,
      tags,
      // language: language || 'English',
      thumbnailUrl: cloudinaryResult2.url || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      fileUrl: cloudinaryResult.url || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      price,
      status
    });
    const newEbook = await ebook.save();
    return (0, import_responseUtils.sendResponse)(res, "Ebook created successfully", newEbook);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllEbooks = async (req, res) => {
  try {
    const ebooks = await import_ebookModle.default.find().select("-createdAt -updatedAt -__v");
    return (0, import_responseUtils.sendResponse)(res, "Ebooks retrieved successfully", ebooks);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllEbooksbyCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ebooks = await import_ebookModle.default.find({ category }).select(
      "-createdAt -updatedAt -__v"
    );
    if (!ebooks) {
      return (0, import_responseUtils.sendResponse)(res, "Ebook not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Ebooks retrieved successfully", ebooks);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getEbookById = async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await import_ebookModle.default.findById(id).select("-createdAt -updatedAt -__v");
    if (!ebook) {
      return (0, import_responseUtils.sendResponse)(res, "Ebook not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Ebook retrieved successfully", ebook);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      author,
      category,
      tags,
      // classId,
      // subjectId,
      // language,
      price,
      status
    } = req.body;
    if (!req.files)
      throw (0, import_console.error)("No file uploaded");
    const locaFilePath = req.files.uploadedFile[0].path;
    const locaFilePath2 = req.files.thumbnailUrl[0].path;
    const cloudinaryResult = await (0, import_storage.uploadToCloudinary)(locaFilePath);
    const cloudinaryResult2 = await (0, import_storage.uploadToCloudinary)(locaFilePath2);
    const ebook = await import_ebookModle.default.findByIdAndUpdate(
      id,
      {
        title,
        description,
        author,
        category,
        tags,
        // classId,
        thumbnailUrl: cloudinaryResult2.url,
        fileUrl: cloudinaryResult.url,
        price,
        status
      },
      { new: true }
    );
    if (!ebook) {
      return (0, import_responseUtils.sendResponse)(res, "Ebook not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Ebook updated successfully", ebook);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await import_ebookModle.default.findByIdAndDelete(id);
    if (!ebook) {
      return (0, import_responseUtils.sendResponse)(res, "Ebook not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Ebook deleted successfully", null);
  } catch (error2) {
    console.error(error2);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEbook,
  deleteEbook,
  getAllEbooks,
  getAllEbooksbyCategory,
  getEbookById,
  updateEbook
});
