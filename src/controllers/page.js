import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
import CommentComponent from "../components/comment.js";
import LoadMoreButtonComponent from "../components/load-more-button.js";

import {generateCommentsArray} from "../mock/comment";

import {RenderPosition, render, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderPopupsAndCarts = (filmList, card) => {
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

    const commentsAmmount = card.commentsAmmount;
    const commentsArray = generateCommentsArray(commentsAmmount);

    commentsArray.forEach((comment) => {
      render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const cardComponent = new FilmCardComponent(card);
  cardComponent.setOnPosterClickHandler(onPosterClick);

  render(filmList, cardComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsElement, cards) => {

  const filmsListElement = filmsElement.getElement().querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  cards.slice(0, showingFilmsCount).forEach((card) => renderPopupsAndCarts(filmsListElement, card));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();

  if (cards.length > 0) {
    render(filmsElement.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  loadMoreButtonComponent.setClickHandler(() => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    cards.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCarts(filmsListElement, card));

    if (showingFilmsCount >= cards.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

  }

  render(films) {
    renderFilms(this._container, films);
  }

}
