import fs from "fs";

import getToken from "./getToken.js";

const getAppointments = async () => {
  console.log("Getting appointments...");
  const token = await getToken();
  const response = await fetch(
    `https://${process.env.AM_DOMAIN}/worker/api/Schedule/getAppointments`,
    {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ StartDate: "2025-01-01", EndDate: "2025-03-31" }),
    },
  );
  const data = await response.json();
  console.log("Appointments received!");
  fs.writeFileSync("./appointments.json", JSON.stringify(data, null, "\t"));
  return data;
};

export default getAppointments;
