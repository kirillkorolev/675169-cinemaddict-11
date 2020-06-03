import AbstractComponent from "./abstract-component.js";
import {SortType} from "../const.js";

const createSortMenuTemplate = () => {
  return (`<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RATING_DOWN}" class="sort__button">Sort by rating</a></li>
</ul>`);
};

export default class SortMenu extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortMenuTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;
      evt.target.classList.add(`sort__button--active`);

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }


  markDefault() {
    let active = this.getElement().querySelector(`.sort__button--active`);

    const defaultItem = this.getElement().querySelector(`.sort__button`);
    const sortType = defaultItem.dataset.sortType;

    if (this._currentSortType === sortType) {
      return;
    }

    active.classList.remove(`sort__button--active`);
    defaultItem.classList.add(`sort__button--active`);
  }
}
