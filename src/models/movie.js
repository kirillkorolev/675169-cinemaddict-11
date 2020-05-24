import Comment from "../models/comment.js";

export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.original = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.poster = data[`film_info`][`poster`];
    this.ageCategory = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writersNames = data[`film_info`][`writers`];
    this.actorsNames = data[`film_info`][`actors`];
    this.year = data[`film_info`][`release`][`date`];
    this.countryBirth = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genre = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.isInWatchList = Boolean(data[`user_details`][`watchlist`]);
    this.isInWatchedList = Boolean(data[`user_details`][`already_watched`]);
    this.isInFavoriteList = Boolean(data[`user_details`][`favorite`]);
    this.comments = data[`comments`];
  }

  static parseMovie(data, comments) {
    return new Movie(data, Comment.parseComments(comments));
  }

  // static parseFilms(films, comments) {
  //   return films.map((film, i) => Movie.parseFilm(film, comments[i]));
  // }

  static parseMovies(movies, comments) {
    // return data.map(Movie.parseMovie);
    return movies.map((movie, i) => Movie.parseMovie(movie, comments[i]));
  }
}
