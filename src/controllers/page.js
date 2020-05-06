import LoadMoreButtonComponent from "../components/load-more-button.js";

import SortComponent, {SortType} from "../components/sort.js";
import MovieController from "../controllers/movie.js";

import {RenderPosition, render, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// export const renderPopupsAndCards = (filmList, card) => {
//   const siteFooterElement = document.querySelector(`.footer`);

//   const removePopup = () => {
//     siteFooterElement.removeChild(popupComponent.getElement());
//     popupComponent.clearComments();
//   };

//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       removePopup();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const popupComponent = new PopupComponent(card);
//   popupComponent.setOnCloseButtonClickHandler(() => {
//     removePopup();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

//   const onPosterClick = () => {
//     siteFooterElement.appendChild(popupComponent.getElement());

//     const comments = card.comments;

//     comments.forEach((comment) => {
//       render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
//     });

//     document.addEventListener(`keydown`, onEscKeyDown);
//   };

//   const cardComponent = new FilmCardComponent(card);
//   cardComponent.setOnPosterClickHandler(onPosterClick);

//   render(filmList, cardComponent, RenderPosition.BEFOREEND);
// };

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
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedMovieControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    const siteMainElement = document.querySelector(`.main`);

    if (this._films.length > 0) {
      render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);

      const container = this._container.getElement();
      const filmsListElement = container.querySelector(`.films-list__container`);
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      const movies = renderMovies(filmsListElement, films.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(movies);

      this._renderLoadMoreButton(films);
    }
  }

  _renderLoadMoreButton(items) {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list__container`);

    render(container.querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const newFilms = renderMovies(filmsListElement, items.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCount >= items.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list__container`);

    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const sortedFilms = getSortedFilms(this._films, sortType);

    filmsListElement.innerHTML = ``;
    const newFilms = renderMovies(filmsListElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    this._renderLoadMoreButton(sortedFilms);
  }
}
