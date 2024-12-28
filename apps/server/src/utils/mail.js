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
var mail_exports = {};
__export(mail_exports, {
  sendMail: () => sendMail
});
module.exports = __toCommonJS(mail_exports);
var import_mail = __toESM(require("@sendgrid/mail"));
const sendMail = (data) => {
  import_mail.default.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "<" + data.email + ">",
    from: "<priyansh@support305.com>",
    subject: "Login Credentials for Standard English Public School",
    text: `Dear ${data.fullName},

Your login credentials for Standard English Public School are as follows:

Username: ${data.email}
Password: ${data.password}

Please use these credentials to log in to your account.

Best regards,
The Standard English Public School Team`
  };
  import_mail.default.send(msg);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendMail
});
