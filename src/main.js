const FILM_COUNT = 5;
const EXTRAS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

import { createUserStatusTemplate } from "./components/user-status";
import { createMenuTemplate } from "./components/menu";
import { createFilmsElement } from "./components/films";
import { createLoadMoreButtonTemplate } from "./components/load-more-button";

render(siteHeaderElement, createUserStatusTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsElement(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsElement = siteMainElement.querySelector(`.films-list`);
const filmsListElement = filmsElement.querySelector(`.films-list .films-list__container`
);

import { createFilmCardTemplate } from "./components/film-card";
import { createExtrasElement } from "./components/films-extras";

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate(), `beforeend`);
}

render(allFilmsElement, createLoadMoreButtonTemplate(), `beforeend`);
render(filmsElement, createExtrasElement(), `beforeend`);

const topRatedFilmsListElement = filmsElement.querySelector(`.films-list--extra-rated .films-list__container`
);
const topCommentedFilmsListElement = filmsElement.querySelector(`.films-list--extra-commented .films-list__container`
);

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(topRatedFilmsListElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(topCommentedFilmsListElement, createFilmCardTemplate(), `beforeend`);
}
