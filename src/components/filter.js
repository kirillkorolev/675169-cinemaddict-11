import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createCategorieMarkup = (categorie, isChecked) => {
  const {name, count} = categorie;

  const active = isChecked ? `main-navigation__item--active` : ``;
  const countNumber = !isChecked ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (`<a href="#${name}" id="filter__${name}"  class="main-navigation__item ${active}">${name} ${countNumber}</a>`);
};

const createFilterTemplate = (categories) => {
  const categorieMarkup = categories.map((it, i) => createCategorieMarkup(it, i === 0)).join(`\n`);
  return (`<nav class="main-navigation">
            <div class="main-navigation__items">${categorieMarkup}</div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`);
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);

      if (evt.target.tagName !== `A`) {
        return;
      }

      this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);

      if (evt.target.classList.contains(`.main-navigation__item--active`)) {
        return;
      }

    });
  }
}


