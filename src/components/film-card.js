import AbstractComponent from "./abstract-component.js";
import {formatRuntime, formatYear} from "../utils/common.js";

const createFilmCardTemplate = (filmCard) => {
  const {title, rating, year, duration, genre, description, poster, comments, isInWatchList, isInWatchedList, isInFavoriteList} = filmCard;

  return (`<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${formatYear(year)}</span>
    <span class="film-card__duration">${formatRuntime(duration)}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchList ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInWatchedList ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavoriteList ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
  </form>
</article>`);
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setOnPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }


  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavouriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
