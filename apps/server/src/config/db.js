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
var db_exports = {};
__export(db_exports, {
  connectDB: () => connectDB,
  default: () => db_default
});
module.exports = __toCommonJS(db_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://prynsh:prynsh7@mongocluster.kvqhj.mongodb.net/scmgmt";
const connectDB = () => import_mongoose.default.connect(MONGO_URL).then(() => console.log(`DB Connected Succesfully.... :: ${MONGO_URL}`)).catch((err) => {
  console.log("DB Connection Failed!");
  console.log(err);
  process.exit(1);
});
var db_default = connectDB;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectDB
});
