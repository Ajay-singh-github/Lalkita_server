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
var userModel_exports = {};
__export(userModel_exports, {
  default: () => userModel_default
});
module.exports = __toCommonJS(userModel_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_validator = __toESM(require("validator"));
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_crypto = __toESM(require("crypto"));
var import_constants = require("../utils/constants");
const userSchema = new import_mongoose.default.Schema(
  {
    profileImage: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJfQpO3v4NSrlVvMpFYWw7YjijzAKTbuXHg&s"
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: [import_validator.default.isEmail, "Please enter email in correct format"],
      unique: true
    },
    fullName: {
      type: String,
      required: [true, "Please provide your name"],
      maxlength: [30, "Name cannot exceed 30 characters"]
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be of atleast 6 characters."]
    },
    mobileNo: {
      type: Number,
      unique: true,
      required: [true, "Please provide a mobile number"]
    },
    gender: {
      type: String
    },
    role: {
      type: String,
      default: import_constants.Role.USER
    },
    address: {
      type: String
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
  },
  {
    timestamps: true
  }
);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await import_bcryptjs.default.hash(this.password, 10);
});
userSchema.methods.isValidatedPassword = async function(usersendPassword, password) {
  return await import_bcryptjs.default.compare(usersendPassword, password);
};
userSchema.methods.getJwtToken = function() {
  return import_jsonwebtoken.default.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY
    }
  );
};
userSchema.methods.getForgotPasswordToken = function() {
  const forgotToken = import_crypto.default.randomBytes(20).toString("hex");
  this.forgotPasswordToken = import_crypto.default.createHash("sha256").update(forgotToken).digest("hex");
  this.forgotPasswordExpiry = Date.now() + 60 * 60 * 1e3;
  return forgotToken;
};
const User = import_mongoose.default.model("User", userSchema);
var userModel_default = User;
