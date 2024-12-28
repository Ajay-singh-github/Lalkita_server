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
var eventController_exports = {};
__export(eventController_exports, {
  createEvent: () => createEvent,
  deleteEvent: () => deleteEvent,
  getEventById: () => getEventById,
  getEventDates: () => getEventDates,
  getEvents: () => getEvents,
  updateEvent: () => updateEvent
});
module.exports = __toCommonJS(eventController_exports);
var import_model = __toESM(require("../model"));
var import_responseUtils = require("../utils/responseUtils");
var import_constants = require("../utils/constants");
var import_date_fns = require("date-fns");
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      eventDate,
      description,
      organizer,
      location
    } = req.body;
    if (!eventName || !eventType || !eventDate || !description || !organizer || !location) {
      return (0, import_responseUtils.sendResponse)(res, "Please fill all the details", null, false, 400);
    }
    const newEvent = new import_model.default.SchoolEvent({
      eventName,
      eventType,
      eventDate,
      description,
      organizer,
      location,
      eventStatus: import_constants.Status.ACTIVE
    });
    await newEvent.save();
    return (0, import_responseUtils.sendResponse)(res, "Event created successfully", {
      eventId: newEvent._id,
      eventName: newEvent.eventName,
      eventType: newEvent.eventType,
      eventDate: newEvent.eventDate,
      eventDescription: newEvent.description,
      organizer: newEvent.organizer,
      location: newEvent.location
    });
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getEvents = async (req, res) => {
  try {
    const events = await import_model.default.SchoolEvent.find().select("-createdAt -updatedAt -__v").sort({ createdAt: -1 });
    if (!events || events.length === 0) {
      console.log("No events found");
      return (0, import_responseUtils.sendResponse)(res, "No events found", [], true, 200);
    }
    return (0, import_responseUtils.sendResponse)(res, "Events fetched successfully", events, true);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Please provide eventId in the params",
        null,
        false,
        400
      );
    }
    const event = await import_model.default.SchoolEvent.findById(eventId).select(
      "-createdAt -updatedAt -__v"
    );
    if (!event) {
      return (0, import_responseUtils.sendResponse)(res, "Event not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Event fetched successfully", event);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      eventName,
      eventType,
      eventDate,
      eventStatus,
      description,
      organizer,
      location
    } = req.body;
    if (!eventId) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Please provide eventId in the params",
        null,
        false,
        400
      );
    }
    const updatedEvent = await import_model.default.SchoolEvent.findByIdAndUpdate(
      eventId,
      {
        eventName,
        eventType,
        eventDate,
        eventStatus,
        description,
        organizer,
        location
      },
      { new: true }
    );
    if (!updatedEvent) {
      return (0, import_responseUtils.sendResponse)(res, "Event not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Event updated successfully", updatedEvent);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return (0, import_responseUtils.sendResponse)(
        res,
        "Please provide eventId in the params",
        null,
        false,
        400
      );
    }
    const deletedEvent = await import_model.default.SchoolEvent.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return (0, import_responseUtils.sendResponse)(res, "Event not found", null, false, 404);
    }
    return (0, import_responseUtils.sendResponse)(res, "Event deleted successfully", deleteEvent);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const getEventDates = async (req, res) => {
  try {
    const events = await import_model.default.SchoolEvent.find().select("eventDate").sort({ eventDate: 1 });
    const formattedDates = events.map((event) => (0, import_date_fns.format)(event.eventDate, "yyyy-MM-dd"));
    return (0, import_responseUtils.sendResponse)(res, "Event dates fetched successfully", formattedDates);
  } catch (error) {
    console.error(error);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEvent,
  deleteEvent,
  getEventById,
  getEventDates,
  getEvents,
  updateEvent
});
