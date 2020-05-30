import LoadMoreButtonComponent from "../components/load-more-button.js";

import SortComponent, {SortType} from "../components/sort.js";
import MovieController from "../controllers/movie.js";

import {RenderPosition, render, remove, replace} from "../utils/render.js";

import RatedFilmsComponent from "../components/rated-films.js";
import CommentedFilmsComponent from "../components/commented-films.js";
import NoFilmsComponent from "../components/no-films.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRAS_COUNT = 2;

const renderMovies = (movieElement, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(movieElement, onDataChange, onViewChange);

    movieController.render(movie);
    return movieController;
  });
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms;
};


export default class PageController {
  constructor(container, moviesModel, api) {

    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedMovieControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  // hide() {
  //   this._container.hide();
  // }

  // show() {
  //   this._container.show();
  // }

  render() {
    const movies = this._moviesModel.getMovies();
    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._sortComponent, RenderPosition.AFTERBEGIN);


    if (movies.length > 0) {
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
      this._renderMovies(movies.slice(0, showingFilmsCount));
      this._renderLoadMoreButton(movies);

      const commentedMovies = this._moviesModel.getMovies().slice().sort((prev, next) => next.comment.length - prev.comment.length).slice(0, EXTRAS_COUNT);
      const ratedMovies = this._moviesModel.getMovies().slice().sort((prev, next) => next.raiting - prev.raiting).slice(0, EXTRAS_COUNT);

      const ratedFilmsComponent = new RatedFilmsComponent();
      const commentedFilmsComponent = new CommentedFilmsComponent();

      render(this._container.getElement(), ratedFilmsComponent, RenderPosition.BEFOREEND);
      render(this._container.getElement(), commentedFilmsComponent, RenderPosition.BEFOREEND);

      this._renderTopCommentedMovies(commentedMovies);
      this._renderTopRatedMovies(ratedMovies);
    } else {
      const noFilmsComponent = new NoFilmsComponent();
      replace(noFilmsComponent, this._container.getElement());
    }
  }

  _renderMovies(movies) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list__container`);

    const newMovies = renderMovies(filmsListElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _renderTopRatedMovies(movies) {
    const topCommentedContainer = this._container.getElement().querySelector(`.films-list--extra-rated .films-list__container`);
    const topCommentedMovies = renderMovies(topCommentedContainer, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(topCommentedMovies);
  }

  _renderTopCommentedMovies(movies) {
    const topRatedContainer = this._container.getElement().querySelector(`.films-list--extra-commented .films-list__container`);
    const topRatedFilms = renderMovies(topRatedContainer, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(topRatedFilms);
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderLoadMoreButton(items) {
    if (this._showingFilmsCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list__container`);

    render(container.querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const newMovies = renderMovies(filmsListElement, items.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showingFilmsCount >= items.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _updateMovies() {
    remove(this._loadMoreButtonComponent);
    this._removeMovies();

    const updatedMovies = this._moviesModel.getMovies();
    const container = this._container.getElement();

    if (updatedMovies.length > 0) {
      this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
      this._renderMovies(updatedMovies.slice(0, this._showingFilmsCount));

      if (this._showingFilmsCount >= updatedMovies.length) {
        return;
      }

      render(container.querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = this._showingFilmsCount;
        this._showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
        const filmsListElement = container.querySelector(`.films-list__container`);

        const newMovies = renderMovies(filmsListElement, updatedMovies.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);

        this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

        if (this._showingFilmsCount >= updatedMovies.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    }
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovies(oldData.id, movieModel);

        if (isSuccess) {
          movieController.render(newData);
        }
      });
  }

  _onFilterChange() {
    this._updateMovies();
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list__container`);

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const sortedMovies = getSortedFilms(this._moviesModel.getMovies(), sortType);

    this._removeMovies();
    const newFilms = renderMovies(filmsListElement, sortedMovies.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    this._renderLoadMoreButton(sortedMovies);
  }

  showLoadingMessage() {
    const title = this._container.getElement().querySelector(`.films-list__title`);
    title.classList.remove(`visually-hidden`);
    title.textContent = `Loading...`;
  }

  hideLoadingMessage() {
    const title = this._container.getElement().querySelector(`.films-list__title`);
    title.textContent = `All movies. Upcoming`;
    title.classList.add(`visually-hidden`);
  }
}
