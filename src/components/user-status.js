import {createElement} from "../utils";

const createUserStatusTemplate = (info) => {
  const {status} = info;

  return (`<section class="header__profile profile">
  <p class="profile__rating">${status}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
};

export default class Status {
  constructor(info) {
    this._info = info;

    this._element = null;
  }

  getTemplate() {
    return createUserStatusTemplate(this._info);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
