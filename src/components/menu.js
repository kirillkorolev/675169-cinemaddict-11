import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {
  return (`<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`);
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate(this._categories);
  }
}
