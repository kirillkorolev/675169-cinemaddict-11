import {FilterType} from "../const.js";

export const getAllMovies = (movies) => {
  return movies;
};

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isInWatchList);
};

export const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isInWatchedList);
};

export const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.isInFavoriteList);
};

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return getAllMovies(movies);

    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);

    case FilterType.HISTORY:
      return getWatchedMovies(movies);

    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return movies;
};
