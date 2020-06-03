import AbstractComponent from "./abstract-component.js";

const createUserStatusTemplate = () => {
  return (`<section class="header__profile profile">
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`);
};

export default class Status extends AbstractComponent {
  getTemplate() {
    return createUserStatusTemplate();
  }
}
