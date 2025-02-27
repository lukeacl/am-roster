import fs from "fs";
import moment from "moment";

import getToken from "./getToken.js";

const getAppointments = async () => {
  console.log("Getting appointments...");
  const token = await getToken();
  const start = moment()
    .subtract("1", "month")
    .startOf("month")
    .format("YYYY-MM-DD");
  const end = moment().add("1", "month").endOf("month").format("YYYY-MM-DD");
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
      body: JSON.stringify({
        StartDate: start,
        EndDate: end,
      }),
    },
  );
  const data = await response.json();
  console.log("Appointments received!");
  fs.writeFileSync("./appointments.json", JSON.stringify(data, null, "\t"));
  return data;
};

export default getAppointments;
