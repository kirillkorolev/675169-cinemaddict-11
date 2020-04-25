import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
import CommentComponent from "../components/comment.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

import {RenderPosition, render, remove} from "../utils/render.js";

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

export default class PageController {
  constructor(container) {
    this._container = container;

    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    const filmsListElement = container.querySelector(`.films-list__container`);
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    films.slice(0, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));

    if (films.length > 0) {
      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCards(filmsListElement, card));

      if (showingFilmsCount >= films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
