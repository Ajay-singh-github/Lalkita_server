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
var eventModle_exports = {};
__export(eventModle_exports, {
  default: () => eventModle_default
});
module.exports = __toCommonJS(eventModle_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_constants = require("../utils/constants");
const schoolEventSchema = new import_mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    description: { type: String },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    eventStatus: { type: String, default: import_constants.Status.PENDING }
  },
  {
    timestamps: true
  }
);
const SchoolEvent = import_mongoose.default.model("SchoolEvent", schoolEventSchema);
var eventModle_default = SchoolEvent;
