import Movie from "./models/movie.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      // .then(Movie.parseMovies);
      .then((movies) => {
        return Promise.all(movies.map((it) => this.getComments(it.id)))
          .then((comments) => {
            return Movie.parseMovies(movies, comments);
          });
      });
  }

  getComments(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {headers})
      .then((response) => response.json());
  }

  // updateMovie(id, data) {
  //   const headers = new Headers();
  //   headers.append(`Authorization`, this._authorization);

  //   return fetch(`https://11.ecmascript.pages.academy/cinemaddict/${id}`, {
  //     method: `PUT`,
  //     body: JSON.stringify(data),
  //     headers,
  //   })
  //     .then((response) => response.json())
  //     .then(Movie.parseTasks);
  // }
};

export default API;
