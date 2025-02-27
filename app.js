import dotenv from "dotenv";
import express from "express";
import ical, { ICalCalendarMethod } from "ical-generator";
import moment from "moment";

import getAppointments from "./lib/getAppointments.js";
import loadAppointments from "./lib/loadAppointments.js";

dotenv.config();

console.log(
  moment().subtract("1", "month").startOf("month").format("YYYY-MM-DD"),
);

console.log(moment().add("1", "month").endOf("month").format("YYYY-MM-DD"));

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({});
});

app.get("/refresh-appointments", async (req, res) => {
  await getAppointments();
  res.redirect("/");
});

app.get("/calendar", async (req, res) => {
  const calendar = ical({ name: "Air Maestro" });
  calendar.method(ICalCalendarMethod.PUBLISH);
  const data = await loadAppointments();
  for (const appointment of data.RosteredData) {
    if (appointment.StartTime !== null && appointment.EndTime !== null) {
      calendar.createEvent({
        id: appointment.RosterID,
        start: moment(appointment.StartTime).add("1", "hour").toISOString(),
        end: moment(appointment.EndTime).add("1", "hour").toISOString(),
        summary: appointment.CodeName,
        description: appointment.Note,
      });
    } else if (appointment.Date !== null) {
      calendar.createEvent({
        id: appointment.RosterID,
        start: moment(appointment.Date + "Z")
          .add("1", "hour")
          .toISOString(),
        allDay: true,
        summary: appointment.CodeName,
        description: appointment.Note,
      });
    }
  }
  res.writeHead(200, {
    "Content-Type": "text/calendar; charset=utf-8",
    "Content-Disposition": 'attachment; filename="calendar.ics"',
  });
  res.end(calendar.toString());
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
