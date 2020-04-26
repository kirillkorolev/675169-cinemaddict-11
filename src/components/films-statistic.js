import AbstractComponent from "./abstract-component.js";

const createFilmsStatictic = (ammount) => {
  return (`<p>${ammount} movies inside</p>`);
};

export default class FilmsStatistic extends AbstractComponent {
  constructor(ammount) {
    super();

    this._ammount = ammount;
  }

  getTemplate() {
    return createFilmsStatictic(this._ammount);
  }
}
