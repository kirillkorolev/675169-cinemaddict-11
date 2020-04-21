import {createElement} from "../utils.js";

const createNoFilmsTemplate = () => {
  return (`<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`);
};

export default class NoFilms {
  consntructor() {
    this._element = 0;
  }

  createTemplate() {
    return createNoFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.createTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
