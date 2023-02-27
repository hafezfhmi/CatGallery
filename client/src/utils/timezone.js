import moment from "moment";

export const toLocalTime = (dateStr) => {
  // Convert the date string to a Moment object in UTC time
  const dateObj = moment.utc(dateStr);

  // Convert the Moment object to the user's local time
  const localDateObj = dateObj.local();

  // Format the local date as "DD-MM-YY"
  const formattedDate = localDateObj.format("hh:mm:ss");

  return formattedDate;
};

export const timeFromNow = (dateStr) => {
  // Convert the date string to a Moment object in UTC time
  const dateObj = moment.utc(dateStr);

  // Convert the Moment object to the user's local time
  const localDateObj = dateObj.local();

  // Calculate the difference between the date and now
  const timeFromNow = moment(localDateObj).fromNow(true);

  return timeFromNow;
};
