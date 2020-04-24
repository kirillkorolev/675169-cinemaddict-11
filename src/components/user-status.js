import AbstractComponent from "./abstract-component.js";

const createUserStatusTemplate = (info) => {
  const {status} = info;

  return (`<section class="header__profile profile">
  <p class="profile__rating">${status}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
};

export default class Status extends AbstractComponent {
  constructor(info) {
    super();

    this._info = info;
  }

  getTemplate() {
    return createUserStatusTemplate(this._info);
  }
}
