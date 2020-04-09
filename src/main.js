import {createUserStatusTemplate} from "./components/user-status";
import {createMenuTemplate} from "./components/menu";
import {createFilmsElement} from "./components/films";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtrasElement} from "./components/films-extras";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";


const FILM_COUNT = 21;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRAS_COUNT = 2;

const cards = generateCards(FILM_COUNT);
const categories = generateCategories();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserStatusTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(categories), `beforeend`);
render(siteMainElement, createFilmsElement(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const allFilmsElement = siteMainElement.querySelector(`.films-list`);
const filmsListElement = filmsElement.querySelector(`.films-list .films-list__container`
);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

cards.slice(0, showingFilmsCount).forEach((card) => render(filmsListElement, createFilmCardTemplate(card), `beforeend`));

render(allFilmsElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = filmsElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  cards.slice(prevFilmsCount, showingFilmsCount).forEach((card) => render(filmsListElement, createFilmCardTemplate(card), `beforeend`));

  if (showingFilmsCount >= cards.length) {
    loadMoreButton.remove();
  }
});

render(filmsElement, createExtrasElement(), `beforeend`);

const topRatedFilmsListElement = filmsElement.querySelector(`.films-list--extra-rated .films-list__container`
);
const topCommentedFilmsListElement = filmsElement.querySelector(`.films-list--extra-commented .films-list__container`
);

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(topRatedFilmsListElement, createFilmCardTemplate(cards[i]), `beforeend`);
}

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(topCommentedFilmsListElement, createFilmCardTemplate(cards[i]), `beforeend`);
}
