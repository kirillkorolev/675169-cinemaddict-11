import moment from "moment";

export const formatRuntime = (runtime) => {
  // return moment.duration(runtime, `minutes`).format(`h mm`);
  return runtime;
};

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
}

