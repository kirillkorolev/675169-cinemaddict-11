import AbstractComponent from "./abstract-component.js";
import {encode} from "he";

import {formatCommentDate} from "../utils/common.js";

const createCommentMarkup = (commentItem) => {

  const {id, emotion, author, comment, date} = commentItem;
  const commentText = encode(comment);

  return (`<li class="film-details__comment" id="${id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${commentText}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatCommentDate(date)}</span>
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
