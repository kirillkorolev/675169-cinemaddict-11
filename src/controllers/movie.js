import PopupComponent from "../components/popup.js";
import FilmCardComponent from "../components/film-card.js";
// import CommentComponent from "../components/comment.js";

import {RenderPosition, render, replace, remove} from "../utils/render.js";

const siteFooterElement = document.querySelector(`.footer`);

const Mode = {
  DEFAULT: `default`,
  OPENEDPOPUP: `opened`,
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
    const oldMovie = this._cardComponent;
    const oldPopup = this._popupComponent;

    this._cardComponent = new FilmCardComponent(movie);
    this._popupComponent = new PopupComponent(movie);

    const onPosterClick = () => {
      this._onViewChange();
      siteFooterElement.appendChild(this._popupComponent.getElement());

      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.OPENEDPOPUP;
    };

    const updateWatchList = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchList: !movie.isInWatchList,
      }));
    };

    const updateWatchedList = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchedList: !movie.isInWatchedList,
      }));
    };

    const updateFavoriteList = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInFavoriteList: !movie.isInFavoriteList,
      }));
    };

    this._popupComponent.setOnCloseButtonClickHandler(() => {
      this._removePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardComponent.setWatchlistButtonClickHandler(updateWatchList);
    this._cardComponent.setWatchedButtonClickHandler(updateWatchedList);
    this._cardComponent.setFavouriteButtonClickHandler(updateFavoriteList);

    this._popupComponent.setOnWatchListInputClickHandler(updateWatchList);
    this._popupComponent.setOnWatchedInputClickHandler(updateWatchedList);
    this._popupComponent.setOnFavoriteListInputClickHandler(updateFavoriteList);

    this._cardComponent.setOnPosterClickHandler(onPosterClick);

    if (oldMovie && oldPopup) {
      replace(this._cardComponent, oldMovie);
      replace(this._popupComponent, oldPopup);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
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

  _closePopup() {
    this._mode = Mode.DEFAULT;

    this._popupComponent.getElement().remove();
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._cardComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

