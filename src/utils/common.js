import moment from "moment";

export const formatRuntime = (runtime) => {
  const duration = moment.duration(runtime, `minutes`);

  if (runtime > 60) {
    return duration.hours() + `h ` + duration.minutes() + `m`;
  } else {

    return duration.minutes() + `m`;
  }
};

export const formatYear = (date) => moment(date).year();

export const formatCommentDate = (data) => {
  const utc = moment.utc(data).toDate();

  const year = moment(utc).year();
  const month = moment(utc).month();
  const date = moment(utc).date();

  const currentYear = moment().year();
  const currentMonth = moment().month();
  const currentDate = moment().date();
  const term = currentDate - date;
  let result = ``;

  if (year === currentYear && month === currentMonth && date < currentDate && term <= 6) {
    result = moment({hours: 0}).diff(utc, `days`) + ` days ago`;
  } else {
    result = moment(utc).local().format(`YYYY/MM/DD HH:mm`);
  }
  return result;
};
