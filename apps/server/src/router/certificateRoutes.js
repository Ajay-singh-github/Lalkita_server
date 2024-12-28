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
var certificateRoutes_exports = {};
__export(certificateRoutes_exports, {
  default: () => certificateRoutes_default
});
module.exports = __toCommonJS(certificateRoutes_exports);
var import_express = __toESM(require("express"));
var import_storage = require("../utils/storage");
var import_responseUtils = require("../utils/responseUtils");
var import_path = __toESM(require("path"));
var import_puppeteer_extra = __toESM(require("puppeteer-extra"));
var import_puppeteer_extra_plugin_stealth = __toESM(require("puppeteer-extra-plugin-stealth"));
var import_chromium = __toESM(require("@sparticuz/chromium"));
var import_ejs = __toESM(require("ejs"));
var import_model = __toESM(require("../model"));
var import_console = require("console");
const router = import_express.default.Router();
router.get(
  "/:userId/:courseId/:completionDate",
  async (req, res) => {
    try {
      const { userId, courseId, completionDate } = req.params;
      const studentInfo = await import_model.default.User.findById(userId);
      const courseInfo = await import_model.default.Course.findById(courseId);
      if (!studentInfo)
        throw (0, import_console.error)("No student info found");
      if (!courseInfo)
        throw (0, import_console.error)("No course info found");
      const studentName = studentInfo.fullName;
      const courseName = courseInfo.title;
      const templateData = {
        studentName,
        // courseName,
        completionDate
      };
      const ejsFilePath = import_path.default.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "..",
        "apps",
        "server",
        "src",
        "views",
        "certificate.ejs"
      );
      const html = await import_ejs.default.renderFile(ejsFilePath, templateData);
      import_puppeteer_extra.default.use((0, import_puppeteer_extra_plugin_stealth.default)());
      const browser = await import_puppeteer_extra.default.launch({
        args: import_chromium.default.args,
        defaultViewport: import_chromium.default.defaultViewport,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: true,
        ignoreHTTPSErrors: true
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1700, height: 1400 });
      await page.setContent(html, { waitUntil: "networkidle2" });
      const directoryPath = import_path.default.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "..",
        "apps",
        "server",
        "src",
        "assets"
      );
      const todayDate = (/* @__PURE__ */ new Date()).getTime();
      const pdfFilePath = import_path.default.join(
        directoryPath,
        todayDate + "certificate.pdf"
      );
      await page.pdf({
        printBackground: true,
        path: pdfFilePath,
        format: "A4"
      });
      await browser.close();
      const cloudinaryResult = await (0, import_storage.uploadpdfToCloudinary)(pdfFilePath);
      const pdfUrl = cloudinaryResult.url;
      (0, import_responseUtils.sendResponse)(res, "Certificate generated successfully", {
        pdfUrl
      });
    } catch (error2) {
      (0, import_responseUtils.sendResponse)(res, `error generating certificate ${error2}`, null, false, 500);
    }
  }
);
var certificateRoutes_default = router;
