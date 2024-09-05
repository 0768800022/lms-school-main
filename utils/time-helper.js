import dayjs from "dayjs";

import { DATE_TIME_DISPLAY_FORMAT, DATE_YEAR_FORMAT } from "@/constants/constant";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const convertUtcToLocalTime = (utcTime, format = DATE_TIME_DISPLAY_FORMAT) => {
    try {
        if (utcTime) return dayjs.utc(utcTime).format(format);
    } catch (error) {
        return "";
    }
};

export function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = currentDate.add(1, "days");
    }
    return dateArray.map((item) => dayjs(item).format(DATE_YEAR_FORMAT));
}
