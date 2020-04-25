import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
import CommentComponent from "../components/comment.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import {RenderPosition, render, remove} from "../utils/render.js";

import MenuComponent from "../components/menu.js";
import {generateCategories} from "../mock/menu";
const categories = generateCategories();

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderPopupsAndCards = (filmList, card) => {
  const siteFooterElement = document.querySelector(`.footer`);

  const removePopup = () => {
    siteFooterElement.removeChild(popupComponent.getElement());
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

    const commentsArray = card.commentsArray;
    commentsArray.forEach((comment) => {
      render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const cardComponent = new FilmCardComponent(card);
  cardComponent.setOnPosterClickHandler(onPosterClick);

  render(filmList, cardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (listElement, films) => {
  films.forEach((film) => renderPopupsAndCards(listElement, film));
};


const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingTasks = films.slice();

  switch (sortType) {
    case SortType.RAITING_UP:
      sortedFilms = showingTasks.sort((a, b) => a.raiting - b.raiting);
      break;
    case SortType.DATE_DOWN:
      sortedFilms = showingTasks.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingTasks;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._menuComponent = new MenuComponent(categories);

    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

  }

  render(films) {
    const renderLoadMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }
      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmsListElement, sortedFilms);
        // films.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));

        if (showingFilmsCount >= films.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };


    const container = this._container.getElement();
    const siteMainElement = document.querySelector(`.main`);

    render(siteMainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, this._menuComponent, RenderPosition.AFTERBEGIN);

    const filmsListElement = container.querySelector(`.films .films-list__container`);
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(filmsListElement, films.slice(0, showingFilmsCount));

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListElement.innerHTML = ``;
      renderFilms(filmsListElement, sortedFilms);

      renderLoadMoreButton();
    });
  }
}
