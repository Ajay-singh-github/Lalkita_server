var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_app = __toESM(require("./app"));
var import_db = require("./config/db.js");
var import_dotenv = __toESM(require("dotenv"));
const PORT = process.env.PORT;
import_dotenv.default.config();
const eventDetails = {
  summary: "Meeting with Amar",
  description: "Discuss project updates",
  start: "2024-08-02T11:00:00+05:30",
  end: "2024-08-02T12:00:00+05:30"
};
(0, import_db.connectDB)();
import_app.default.listen(PORT, async () => {
  console.log(`listening at port http://localhost:${PORT}`);
});
