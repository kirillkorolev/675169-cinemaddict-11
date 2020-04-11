import {createUserStatusTemplate} from "./components/user-status";
import {createMenuTemplate} from "./components/menu";
import {createFilmsElement} from "./components/films";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtrasElement} from "./components/films-extras";
import {createFilmPopup} from "./components/popup";

import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";
import {generateComments} from "./components/comment";


const FILM_COUNT = 21;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRAS_COUNT = 2;

const cards = generateCards(FILM_COUNT);
const categories = generateCategories();

const firstCard = cards[0];
const firstCardCommentsAmmount = cards[0].commentsAmmount;

const info = generateAmmountInfo();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserStatusTemplate(info), `beforeend`);
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

render(siteFooterElement, createFilmPopup(firstCard), `beforeend`);
const popup = document.querySelector(`.film-details`);
const commentsList = popup.querySelector(`.film-details__comments-list`);

render(commentsList, generateComments(firstCardCommentsAmmount), `beforeend`);

const popupCloseButton = popup.querySelector(`.film-details__close-btn`);

popupCloseButton.addEventListener(`click`, () => {
  popup.remove();
});
