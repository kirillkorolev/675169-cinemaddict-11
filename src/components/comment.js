import AbstractComponent from "./abstract-component.js";
import {encode} from "he";

// import {formatCommentDate} from "../utils/common.js";

const createCommentMarkup = (comment) => {
  const {id, avatar, name, text, date, time} = comment;

  const commentText = encode(text);

  return (`<li class="film-details__comment" id="${id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${avatar}.png" width="55" height="55" alt="emoji-${avatar}">
  </span>
  <div>
    <p class="film-details__comment-text">${commentText}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${name}</span>
      <span class="film-details__comment-day">${date} ${time}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentMarkup(this._comment);
  }
}
