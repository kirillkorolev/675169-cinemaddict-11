import {randomInteger} from "../utils";

const watchedMoviesAmmount = randomInteger(0, 100);

const getRaiting = (raiting) => {
  let stat = ``;
  if (raiting === 0) {
    stat = ``;
  } else if (raiting <= 10 && raiting >= 1) {
    stat = `Fan`;
  } else if (raiting > 10) {
    stat = `Movie buff`;
  }
  return stat;
};

export const generateAmmountInfo = () => {
  return {
    status: getRaiting(watchedMoviesAmmount)
  };
};
