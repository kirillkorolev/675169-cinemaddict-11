const createCategorieMarkup = (categorie, isChecked) => {
  const {categorieName, count} = categorie;

  return (
    `
    <a href="#${categorieName}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${categorieName} ${isChecked ? `movies` : ``} ${!isChecked ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>
    `
  );
};

export const createMenuTemplate = (categories) => {
  const categorieMarkup = categories.map((it, i) => createCategorieMarkup(it, i === 0)).join(`\n`);
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${categorieMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
  `;
};
