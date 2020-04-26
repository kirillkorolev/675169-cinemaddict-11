import AbstractComponent from "./abstract-component.js";

const createCategorieMarkup = (categorie, isChecked) => {
  const {categorieName, count} = categorie;

  const active = isChecked ? `main-navigation__item--active` : ``;
  const moviesWord = isChecked ? `movies` : ``;
  const countNumber = !isChecked ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (`<a href="#${categorieName}" class="main-navigation__item ${active}">${categorieName} ${moviesWord} ${countNumber}</a>`);
};

const createMenuTemplate = (categories) => {
  const categorieMarkup = categories.map((it, i) => createCategorieMarkup(it, i === 0)).join(`\n`);
  return (`<nav class="main-navigation">
      <div class="main-navigation__items">${categorieMarkup}</div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`);
};

export default class Menu extends AbstractComponent {
  constructor(categories) {
    super();

    this._categories = categories;
  }

  getTemplate() {
    return createMenuTemplate(this._categories);
  }
}
