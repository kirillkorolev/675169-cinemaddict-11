import AbstractComponent from "./abstract-component.js";
import {createStatus} from "../utils/common.js";

const createUserStatusTemplate = (info) => {
  const {status} = info;

  return (`<section class="header__profile profile">
  <p class="profile__rating">${status}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
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
