import AbstractComponent from "./abstract-component.js";

const createFilmsStatictic = (ammount) => {
  return (`<p>${ammount} movies inside</p>`);
};

export default class FilmsStatistic extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._ammount = moviesModel.getMovies().length;
  }

  getTemplate() {
    return createFilmsStatictic(this._ammount);
  }
}
