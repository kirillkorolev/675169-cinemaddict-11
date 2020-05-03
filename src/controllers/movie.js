import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
import CommentComponent from "../components/comment.js";

import {RenderPosition, render} from "../utils/render.js";

const siteFooterElement = document.querySelector(`.footer`);

const Mode = {
  DEFAULT: `default`,
  OPENEDPOPUP: `opened popup`,
};


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._popupComponent = null;
    this._cardComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(movie) {
    this._cardComponent = new FilmCardComponent(movie);
    this._popupComponent = new PopupComponent(movie);

    const commentsList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);

    const onPosterClick = () => {
      siteFooterElement.appendChild(this._popupComponent.getElement());

      const comments = movie.comments;

      comments.forEach((comment) => {
        render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
      });

      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.OPENEDPOPUP;
    };

    this._popupComponent.setOnCloseButtonClickHandler(() => {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._popupComponent.setOnEmojiClickHandler();

    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchList: false,
      }));
    });

    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchedList: false,
      }));
    });

    this._cardComponent.setFavouriteButtonClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInFavouriteList: false,
      }));
    });

    this._cardComponent.setOnPosterClickHandler(onPosterClick);

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
  }

  _removePopup() {
    siteFooterElement.removeChild(this._popupComponent.getElement());
    this._popupComponent.clearComments();
    this._popupComponent.clearAvatarInComment();

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {

      this._removePopup();
      this._popupComponent.rerender();
    }
  }
}
