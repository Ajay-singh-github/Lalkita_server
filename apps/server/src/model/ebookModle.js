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
var ebookModle_exports = {};
__export(ebookModle_exports, {
  default: () => ebookModle_default
});
module.exports = __toCommonJS(ebookModle_exports);
var import_mongoose = __toESM(require("mongoose"));
const ebookSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: false },
    // courseId: { type: mongoose.Types.ObjectId, ref: 'Classes', required: true },
    // subjectId: { type: mongoose.Types.ObjectId, ref: 'Subjects', required: true },
    // language: { type: String ,default:'English'},
    thumbnailUrl: { type: String, default: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    fileUrl: { type: String, required: true },
    status: { type: String, enum: ["available", "unavailable"], required: true },
    rating: { type: Number },
    price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);
const Ebook = import_mongoose.default.model("Ebook", ebookSchema);
var ebookModle_default = Ebook;
