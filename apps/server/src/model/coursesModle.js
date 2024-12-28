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
var coursesModle_exports = {};
__export(coursesModle_exports, {
  default: () => coursesModle_default
});
module.exports = __toCommonJS(coursesModle_exports);
var import_mongoose = __toESM(require("mongoose"));
const courseSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["live", "recorded", "topup"] },
    status: { type: String, enum: ["paid", "free"], required: true },
    thumbnailUrl: { type: String, default: "https://pathfinder.edu.in/wp-content/themes/pathfinder/assets/images/default-course-image.png" },
    tags: { type: [String], required: true },
    language: { type: String },
    rating: { type: Number, default: 4 },
    syllabusUrl: { type: String },
    duration: { type: Number },
    durationUnit: { type: String, enum: ["hours", "days", "weeks", "months"] },
    lectureCount: { type: Number },
    lectureDuration: { type: Number },
    price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);
const Course = import_mongoose.default.model("Course", courseSchema);
var coursesModle_default = Course;
