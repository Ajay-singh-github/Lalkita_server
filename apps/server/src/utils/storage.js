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
var storage_exports = {};
__export(storage_exports, {
  uploadFile: () => uploadFile,
  uploadMultiFile: () => uploadMultiFile,
  uploadToCloudinary: () => uploadToCloudinary,
  uploadpdfToCloudinary: () => uploadpdfToCloudinary
});
module.exports = __toCommonJS(storage_exports);
var import_cloudinary = require("cloudinary");
var import_multer = __toESM(require("multer"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_app = require("../app");
const { v4: uuidv4 } = require("uuid");
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var storage = import_multer.default.diskStorage({
  destination: function(req, file, cb) {
    cb(
      null,
      import_path.default.resolve(
        import_app.publicDir,
        "../../../../../../apps/server/src/public/uploads"
      )
    );
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const random = Math.floor(1e5 + Math.random() * 9e5);
    const fileName = `${uuidv4() + Date.now() + random + file.fieldname}.${ext}`;
    cb(null, fileName);
  }
});
var upload = (0, import_multer.default)({ storage });
const uploadFile = (fieldName) => upload.single(fieldName);
const uploadMultiFile = (fieldName) => upload.fields(fieldName);
async function uploadToCloudinary(locaFilePath) {
  var folder = "main";
  var cloudPath = folder + locaFilePath.replace(/\\/g, "/");
  return import_cloudinary.v2.uploader.upload(locaFilePath, { public_id: cloudPath }).then((result) => {
    import_fs.default.unlinkSync(locaFilePath);
    return {
      message: "Success",
      url: result.url
    };
  }).catch((error) => {
    import_fs.default.unlinkSync(locaFilePath);
    console.log(error);
    return { message: "Fail", url: null };
  });
}
async function uploadpdfToCloudinary(locaFilePath) {
  var folder = "main";
  var cloudPath = folder + locaFilePath.replace(/\\/g, "/").split("D:")[1];
  return import_cloudinary.v2.uploader.upload(locaFilePath, { public_id: cloudPath, resource_type: "raw" }).then((result) => {
    import_fs.default.unlinkSync(locaFilePath);
    return {
      message: "Success",
      url: result.url,
      public_id: result.public_id
    };
  }).catch((error) => {
    import_fs.default.unlinkSync(locaFilePath);
    console.log(error);
    return { message: "Fail", url: null, public_id: null };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadFile,
  uploadMultiFile,
  uploadToCloudinary,
  uploadpdfToCloudinary
});
