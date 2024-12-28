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
var masterController_exports = {};
__export(masterController_exports, {
  getAllActiveEvents: () => getAllActiveEvents,
  getCourseSoldCount: () => getCourseSoldCount,
  getTotalCollectionByMonth: () => getTotalCollectionByMonth
});
module.exports = __toCommonJS(masterController_exports);
var import_responseUtils = require("../../utils/responseUtils");
var import_model = __toESM(require("../../model"));
const getAllActiveEvents = async (req, res) => {
  try {
    const events = await import_model.default.SchoolEvent.find().select("-createdAt  -__v").sort({ createdAt: -1 });
    return (0, import_responseUtils.sendResponse)(res, "Active Events fetched successfully", events);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getCourseSoldCount = async (req, res) => {
  try {
    const coursePurchaseCounts = await import_model.default.Purchase.aggregate([
      {
        $group: {
          _id: "$courseId",
          // Group by courseId
          count: { $sum: 1 }
          // Count the number of purchases for each courseId
        }
      }
    ]);
    if (!coursePurchaseCounts) {
      return (0, import_responseUtils.sendResponse)(res, "No course sold", null, false, 404);
    }
    const response = {
      course: [],
      count: []
    };
    coursePurchaseCounts.forEach(async (item) => {
      console.log(item, item._id);
      const course = await import_model.default.Course.findById(item._id);
      console.log(course);
      response.course.push(course.title);
      response.count.push(item.count);
    });
    return (0, import_responseUtils.sendResponse)(res, "Active Events fetched successfully", response);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getTotalCollectionByMonth = async (req, res) => {
  try {
    const purchases = await import_model.default.Purchase.find({});
    if (!purchases) {
      return (0, import_responseUtils.sendResponse)(res, "No course sold", null, false, 404);
    }
    const monthlyCollection = [];
    purchases.forEach(async (purchase) => {
      const purchaseDate = purchase.purchaseDate;
      const month = purchaseDate.getMonth();
      const course = await import_model.default.Course.findById(purchase.courseId);
      const coursePrice = course.price;
      if (!monthlyCollection[month]) {
        monthlyCollection[month] = 0;
      }
      monthlyCollection[month] += coursePrice;
    });
    return (0, import_responseUtils.sendResponse)(res, "Collection fetched successfully", monthlyCollection);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllActiveEvents,
  getCourseSoldCount,
  getTotalCollectionByMonth
});
