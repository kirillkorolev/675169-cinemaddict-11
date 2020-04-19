import {createElement} from "../utils.js";

const createNoFilmsStatictic = () => {
  return (`<section class="footer__statistics">
  <p>0 movies inside</p>
</section>`);
};

export default class NoFilmsStatictic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsStatictic();
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
