import moment from "moment";

export const formatRuntime = (runtime) => {
  const duration = moment.duration(runtime, `minutes`);

  if (runtime > 60) {
    return duration.hours() + `h ` + duration.minutes() + `m`;
  } else {

    return duration.minutes() + `m`;
  }
};

export const formatYear = (date) => {
  const year = moment(date).year();
  return year;
};
