import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
import CommentComponent from "../components/comment.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

import SortComponent, {SortType} from "../components/sort.js";

import {RenderPosition, render, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export const renderPopupsAndCards = (filmList, card) => {
  const siteFooterElement = document.querySelector(`.footer`);

  const removePopup = () => {
    siteFooterElement.removeChild(popupComponent.getElement());
    popupComponent.getElement().querySelector(`.film-details__comments-list`).innerHTML = ``;
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const popupComponent = new PopupComponent(card);
  popupComponent.setOnCloseButtonClickHandler(() => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

  const onPosterClick = () => {
    siteFooterElement.appendChild(popupComponent.getElement());

    const comments = card.comments;

    comments.forEach((comment) => {
      render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const cardComponent = new FilmCardComponent(card);
  cardComponent.setOnPosterClickHandler(onPosterClick);

  render(filmList, cardComponent, RenderPosition.BEFOREEND);
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RAITING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.raiting - a.raiting);
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

    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    const siteMainElement = document.querySelector(`.main`);

    if (films.length > 0) {
      const renderLoadMoreButton = (items, place) => {
        if (showingFilmsCount >= films.length) {
          return;
        }

        render(place, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

        this._loadMoreButtonComponent.setClickHandler(() => {
          const prevFilmsCount = showingFilmsCount;
          showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

          items.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));

          if (showingFilmsCount >= items.length) {
            remove(this._loadMoreButtonComponent);
          }
        });
      };

      render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);

      const container = this._container.getElement();

      const filmsListElement = container.querySelector(`.films-list__container`);
      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      films.slice(0, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));
      renderLoadMoreButton(films, container);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        remove(this._loadMoreButtonComponent);
        showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

        const sortedFilms = getSortedFilms(films, sortType);

        filmsListElement.innerHTML = ``;
        sortedFilms.slice(0, showingFilmsCount).forEach((film) => {
          renderPopupsAndCards(filmsListElement, film);
        });

        render(container.querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

        this._loadMoreButtonComponent.setClickHandler(() => {
          const prevFilmsCount = showingFilmsCount;
          showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

          sortedFilms.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));

          if (showingFilmsCount >= sortedFilms.length) {
            remove(this._loadMoreButtonComponent);
          }

          renderLoadMoreButton(sortedFilms, container.querySelector(`.films-list`));
        });
      });
    }
  }


}
