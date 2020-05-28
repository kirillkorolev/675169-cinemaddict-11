import Comment from "../models/comment.js";

export default class Movie {
  constructor(data, comments) {
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

    this.comment = comments;
  }

  static parseMovie(data, comments) {
    return new Movie(data, Comment.parseComments(comments));
  }

  static parseMovies(movies, comments) {
    return movies.map((movie, i) => Movie.parseMovie(movie, comments[i]));
  }

  toRAW() {
    return {
      "id": this.id,
      "film_info": {
        "title": this.title,
        "alternative_title": this.original,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.ageCategory,
        "director": this.director,
        "writers": this.writersNames,
        "actors": this.actorsNames,
        "release": {
          "date": this.year,
          "release_country": this.countryBirth,
        },
        "runtime": this.duration,
        "genre": this.genre,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.isInWatchList,
        "already_watched": this.isInWatchedList,
        "favorite": this.isInFavoriteList,
      },
      "comments": this.comment.map((it) => it.id),
      // "comments": this.comment,
    };
  }

  static clone(data) {
    console.log(data);
    return new Movie(data.toRAW());
  }
}
