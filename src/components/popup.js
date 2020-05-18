import AbstractSmartComponent from "./abstract-smart-component.js";
import {createElement} from "../utils/render.js";

import {randomElement} from "../utils.js";
import {nameList} from "../mock/comment.js";

import moment from "moment";
import {nanoid} from "nanoid";

import CommentComponent from "../components/comment.js";
import {RenderPosition, render} from "../utils/render.js";

const createFilmPopup = (card) => {
  const {title, duration, poster, description, rating, comments, isInWatchList, isInWatchedList, isInFavoriteList} = card;

  const originalTitle = `The Great Flamarion`;
  const directorName = `Anthony Mann`;
  const writers = `Anne Wigton, Heinz Herald, Richard Weil`;
  const actors = `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`;
  const releaseDate = `30 March 1945`;
  const country = `USA`;
  const ageRaiting = `18+`;

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">
          <p class="film-details__age">${ageRaiting}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${directorName}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchList ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInWatchedList ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavoriteList ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
        </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" id="smile" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" id="sleeping" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" id="puke" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" id="angry" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();

    this._card = card;
    this._setOnEmojiClickHandler();
    this._renderComments();

    this._closeButtonClickHandler = null;
    this._addWatchInputClickHandler = null;
    this._addWatchedInputClickHandler = null;
    this._addFavoriteInputClickHandler = null;

    this._commentDeleteClickHandler = null;
    this._onNewCommentAddHandler = null;
  }

  getTemplate() {
    return createFilmPopup(this._card);
  }

  clearComments() {
    // this.getElement().querySelector(`.film-details__comments-list`).innerHTML = ``;
  }

  recoveryListeners() {
    this.setOnCloseButtonClickHandler(this._closeButtonClickHandler);
    this._setOnEmojiClickHandler();

    this.setOnWatchListInputClickHandler(this._addWatchInputClickHandler);
    this.setOnWatchedInputClickHandler(this._addWatchedInputClickHandler);
    this.setOnFavoriteListInputClickHandler(this._addFavoriteInputClickHandler);

    this.setOnCommentDeleteClickHandler(this._commentDeleteClickHandler);
    this.setOnNewCommentAddHandler(this._onNewCommentAddHandler);
  }

  setOnCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  _createImg(name) {
    const temlate = `<img src="./images/emoji/${name}.png" width="55" height="55" alt="emoji-${name}" name="${name}">`;

    return createElement(temlate);
  }

  _renderEmoji(place, image) {
    const avatar = this._createImg(image.id);
    if (place.children.length === 0) {
      place.appendChild(avatar);
    }

    if (place.children.length === 1) {
      place.replaceChild(avatar, place.querySelector(`img`));
    }
  }

  _setOnEmojiClickHandler() {
    const emojilist = this.getElement().querySelector(`.film-details__emoji-list`);
    const newComment = this.getElement().querySelector(`.film-details__new-comment`);

    const newCommentAvatar = newComment.querySelector(`.film-details__add-emoji-label`);
    emojilist.addEventListener(`click`, (evt) => {
      const image = evt.target.closest(`img`);

      if (image) {
        this._renderEmoji(newCommentAvatar, image);
      }
    });
  }

  clearAvatarInComment() {
    const addingComment = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const avatar = addingComment.querySelector(`img`);

    if (addingComment.contains(avatar)) {
      addingComment.removeChild(avatar);
    }
  }

  setOnWatchListInputClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, handler);
    this._addWatchInputClickHandler = handler;
  }

  setOnWatchedInputClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, handler);
    this._addWatchedInputClickHandler = handler;
  }

  setOnFavoriteListInputClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, handler);
    this._addFavoriteInputClickHandler = handler;
  }

  _renderComments() {
    const commentsList = this.getElement().querySelector(`.film-details__comments-list`);
    const comments = this._card.comments;

    comments.forEach((comment) => {
      render(commentsList, new CommentComponent(comment), RenderPosition.BEFOREEND);
    });
  }

  setOnCommentDeleteClickHandler(handler) {
    const buttons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    buttons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const index = evt.target.closest(`.film-details__comment`).id;

        handler(index);
      });
    });

    this._commentDeleteClickHandler = handler;
  }

  _parseFormData(formData) {
    return {
      id: nanoid(),
      avatar: this.getElement().querySelector(`.film-details__new-comment img`).name,
      name: nameList[randomElement(nameList)],
      time: moment().format(`HH:mm`),
      date: moment().format(`YYYY/MM/DD`),
      text: formData.get(`comment`),
    };
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  setOnNewCommentAddHandler(handler) {
    this.getElement().addEventListener(`keydown`, (evt) => {

      if (((evt.ctrlKey || evt.metaKey) && evt.key) === `Enter`) {
        evt.preventDefault();

        handler();
      }
    });

    this._onNewCommentAddHandler = handler;
  }
}

