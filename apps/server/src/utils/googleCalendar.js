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
var googleCalendar_exports = {};
__export(googleCalendar_exports, {
  auth: () => auth,
  authenticateServiceAccount: () => authenticateServiceAccount,
  createEvent: () => createEvent,
  listEvents: () => listEvents,
  updateEvent: () => updateEvent
});
module.exports = __toCommonJS(googleCalendar_exports);
var import_googleapis = require("googleapis");
var import_uuid = require("uuid");
var import_responseUtils = require("./responseUtils");
const oauth2Client = new import_googleapis.google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS || "{}");
const CALENDAR_ID = "shouryajain0708@gmail.com";
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar"
];
const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  // To get a refresh token
  scope: SCOPES
});
const authenticateServiceAccount = async () => {
  const auth2 = new import_googleapis.google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: SCOPES
  });
  return await auth2.getClient();
};
const auth = new import_googleapis.google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);
const listEvents = async (req, res) => {
  const calendar = import_googleapis.google.calendar({ version: "v3", auth });
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const tomorrow = new Date((/* @__PURE__ */ new Date()).getTime() + 7 * 24 * 60 * 60 * 1e3).toISOString();
  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: now,
    timeMax: tomorrow,
    singleEvents: true,
    orderBy: "startTime",
    timeZone: "Asia/Kolkata"
  });
  const events = response?.data.items;
  if (events && events.length) {
    const formattedEvents = events.map((event) => {
      const start = event.start?.dateTime || event.start?.date;
      const end = event.end?.dateTime || event.end?.date;
      return {
        summary: event.summary || "No title",
        description: event.description || "No description",
        startDate: start,
        start,
        endTime: end,
        meetingLink: event.hangoutLink || "https://meet.google.com/egt-anwa-jub"
      };
    });
    return (0, import_responseUtils.sendResponse)(res, "Events data fetched successfully", formattedEvents, true, 200);
  } else {
    console.log("No upcoming events found.");
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const createEvent = async (req, res) => {
  const { code } = req.query;
  const { summary, description, start, end } = req.body;
  const calendar = import_googleapis.google.calendar({ version: "v3", auth });
  const event = {
    summary,
    description,
    start: {
      dateTime: start,
      timeZone: "Asia/Kolkata"
    },
    end: {
      dateTime: end,
      timeZone: "Asia/Kolkata"
    },
    conferenceData: {
      createRequest: {
        requestId: (0, import_uuid.v4)()
      }
    }
  };
  try {
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: 1
    });
    if (response.status === 200 && response.statusText === "OK") {
      console.log(response.data);
      return (0, import_responseUtils.sendResponse)(res, "created event Successfully", null, true, 200);
    } else {
      let errorMessage = "Failed to create event.";
      switch (response.status) {
        case 400:
          errorMessage = "Invalid request. Check event details.";
          break;
        case 403:
          errorMessage = "Permission denied. Check service account access.";
          break;
        default:
          errorMessage = response.statusText;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(`Error at createEvent --> ${error}`);
    return (0, import_responseUtils.sendResponse)(res, "Internal Server Error", null, false, 500);
  }
};
const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { summary, description, start, end } = req.body;
  if (!summary || !start || !end) {
    return res.status(400).json({ error: "Summary, start time, and end time are required." });
  }
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: start,
        timeZone: "Asia/Kolkata"
      },
      end: {
        dateTime: end,
        timeZone: "Asia/Kolkata"
      }
    };
    const calendar = import_googleapis.google.calendar({ version: "v3", auth });
    const response = await calendar.events.update({
      calendarId: "primary",
      eventId,
      requestBody: event,
      conferenceDataVersion: 1
    });
    res.status(200).json({
      message: "Event updated successfully",
      data: response.data
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event." });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  authenticateServiceAccount,
  createEvent,
  listEvents,
  updateEvent
});
