import AbstractComponent from "./abstract-component.js";
import {createStatus} from "../utils/common.js";

const createUserStatusTemplate = (status) => {
  return (`<p class="profile__rating">${status}</p>`);
};

export default class Status extends AbstractComponent {
  constructor(moviesModel) {
    super();

    this._ammount = moviesModel.getMovies().filter((elem) => {
      return elem.isInWatchedList === true;
    }).length;
  }

  getTemplate() {
    return createUserStatusTemplate(createStatus(this._ammount));
  }
}
