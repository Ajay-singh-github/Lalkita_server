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
var userController_exports = {};
__export(userController_exports, {
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  forgotPassword: () => forgotPassword,
  getAllUsers: () => getAllUsers,
  getUserById: () => getUserById,
  searchUsers: () => searchUsers,
  updateProfile: () => updateProfile,
  updateUserById: () => updateUserById,
  userLogin: () => userLogin
});
module.exports = __toCommonJS(userController_exports);
var import_userModel = __toESM(require("../model/userModel"));
var import_responseUtils = require("../utils/responseUtils");
var import_storage = require("../utils/storage");
const createUser = async (req, res) => {
  try {
    const { email, fullName, password, mobileNo, address, gender } = req.body;
    if (!email || !fullName || !password || !mobileNo || !address) {
      return (0, import_responseUtils.sendResponse)(res, "Fill all details", null, false, 401);
    }
    if (password.length < 6) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Password must be atleast 6 characters long",
        null,
        false,
        401
      );
    }
    const existingUser = await import_userModel.default.findOne({ email });
    if (existingUser) {
      return (0, import_responseUtils.sendResponse)(res, "User exists with same email", null, false, 401);
    }
    const existingUser2 = await import_userModel.default.findOne({ mobileNo });
    if (existingUser2) {
      return (0, import_responseUtils.sendResponse)(res, "User exists with same mobile number", null, false, 401);
    }
    const newUser = new import_userModel.default({
      email,
      fullName,
      password,
      mobileNo,
      address,
      gender
    });
    await newUser.save();
    return (0, import_responseUtils.sendResponse)(res, "User added", {
      newUser
    });
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await import_userModel.default.findOne({ email });
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "Invalid email", null, false, 401);
    }
    const isValidPassword = await user.isValidatedPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return (0, import_responseUtils.sendResponse)(res, "Invalid password", null, false, 401);
    }
    const token = user.getJwtToken();
    const welcomeMessage = `Welcome back, ${user.fullName}!`;
    return (0, import_responseUtils.sendResponse)(res, welcomeMessage, { token, user });
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await import_userModel.default.findOne({ email });
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    const resetToken = user.getForgotPasswordToken();
    await user.save();
    return (0, import_responseUtils.sendResponse)(res, "Password reset token generated successfully", {
      resetToken
    });
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await import_userModel.default.find({}).sort({ createdAt: -1 }).select("-password");
    return (0, import_responseUtils.sendResponse)(res, "Users Data fetched successfully", users);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const searchCriteria = {
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    };
    const users = await import_userModel.default.find(searchCriteria, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await import_userModel.default.findById(userId, {
      password: 0,
      updatedAt: 0,
      __v: 0
    });
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "User Data fetched successfully", user);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { id } = req.query;
    const locaFilePath = req.file.path;
    console.log("local filepath", locaFilePath);
    const result = await (0, import_storage.uploadToCloudinary)(locaFilePath);
    const url = result.url;
    let user;
    if (url) {
      user = await import_userModel.default.findByIdAndUpdate(
        id,
        {
          profileImage: url
        },
        {
          new: true
        }
      );
    }
    return (0, import_responseUtils.sendResponse)(res, "File Uploaded", user.profileImage);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateUserById = async (req, res) => {
  try {
    const { userId } = req.query;
    const { fullName, email, mobileNo, address, gender, password } = req.body;
    const user = await import_userModel.default.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        mobileNo,
        address,
        gender,
        password
      },
      {
        new: true
      }
    );
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "User updated successfully", user);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(req);
    const user = await import_userModel.default.findByIdAndDelete(id);
    console.log(user);
    if (!user) {
      return (0, import_responseUtils.sendResponse)(res, "User not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "User deleted successfully", user);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  searchUsers,
  updateProfile,
  updateUserById,
  userLogin
});
