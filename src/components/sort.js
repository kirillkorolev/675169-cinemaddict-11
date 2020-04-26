import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DATE_DOWN: `date-down`,
  RAITING_UP: `raiting-up`,
  DEFAULT: `default`,
};

const createSortMenuTemplate = () => {
  return (`<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RAITING_UP}" class="sort__button">Sort by rating</a></li>
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

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
