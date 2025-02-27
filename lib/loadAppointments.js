import fs from "fs";

import getAppointments from "./getAppointments.js";

const loadAppointments = async () => {
  if (fs.existsSync("./appointments.json")) {
    const data = JSON.parse(fs.readFileSync("./appointments.json"));
    return data;
  }
  return await getAppointments();
};

export default loadAppointments;
