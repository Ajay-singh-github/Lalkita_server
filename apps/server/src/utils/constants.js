var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var constants_exports = {};
__export(constants_exports, {
  FeeStatus: () => FeeStatus,
  Role: () => Role,
  Status: () => Status
});
module.exports = __toCommonJS(constants_exports);
const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  PASS: "pass",
  FAIL: "fail",
  PROMOTED: "promoted",
  COMPLETED: "completed",
  IN_PROGRESS: "in_progress"
};
const Role = {
  USER: "user",
  ADMIN: "admin",
  TEACHER: "teacher"
};
const FeeStatus = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  PENDING: "Pending",
  PARTIAL: "Partial Paid"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FeeStatus,
  Role,
  Status
});
