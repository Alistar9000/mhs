import moment from "moment-timezone";

export const isWithinTimeRange = () => {
  const currentTime = moment().tz('Asia/Tehran');
  const startTime = moment().tz('Asia/Tehran').set({ hour: 9, minute: 0, second: 0 });
  const endTime = moment().tz('Asia/Tehran').set({ hour: 12, minute: 30, second: 0 });
  
  return currentTime.isBetween(startTime, endTime);
};