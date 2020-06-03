import AbstractComponent from "./abstract-component.js";
import {formatRuntime, formatYear, createDescription} from "../utils/common.js";

const showGenre = (arr) => {
  let genre = ``;

  if (arr.length === 0) {
    genre = ``;
  } else {
    genre = arr[0];
  }

  return genre;
};

const createFilmCardTemplate = (filmCard) => {
  const {id, title, rating, year, poster, duration, genre, description, isInWatchList, isInWatchedList, isInFavoriteList, comment} = filmCard;

  return (`<article class="film-card" id=${id}>
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${formatYear(year)}</span>
    <span class="film-card__duration">${formatRuntime(duration)}</span>
    <span class="film-card__genre">${showGenre(genre)}</span>
  </p>
  <img src="./${poster}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${createDescription(description)}</p>
  <a class="film-card__comments">${comment.length} comments</a>
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
