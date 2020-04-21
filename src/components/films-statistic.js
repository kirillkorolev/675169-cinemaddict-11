import {createElement} from "../utils.js";

const createFilmsStatictic = (ammount) => {
  return (`<p>${ammount} movies inside</p>`);
};

export default class FilmsStatistic {
  constructor(ammount) {
    this._ammount = ammount;
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatictic(this._ammount);
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
