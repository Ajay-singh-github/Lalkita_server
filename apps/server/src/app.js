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
var app_exports = {};
__export(app_exports, {
  default: () => app_default,
  publicDir: () => publicDir
});
module.exports = __toCommonJS(app_exports);
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));
var import_db = __toESM(require("./config/db.js"));
var import_cors = __toESM(require("cors"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_path = __toESM(require("path"));
var import_router = __toESM(require("./router/index"));
var import_morgan = __toESM(require("morgan"));
import_dotenv.default.config();
const app = (0, import_express.default)();
(0, import_db.default)();
const publicDir = import_path.default.join(__dirname, "public");
app.use("/public/uploads", import_express.default.static(import_path.default.join(publicDir, "uploads")));
app.use((0, import_cors.default)());
app.use((0, import_cookie_parser.default)());
app.use((0, import_morgan.default)("tiny"));
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", import_router.default);
var app_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  publicDir
});
