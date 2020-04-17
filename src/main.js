import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";
// import {generateComments} from "./components/comment";

import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import FilmCardComponent from "./components/film-card.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";
// import PopupComponent from "./components/popup.js";
import {RenderPosition, render} from "./utils";


const FILM_COUNT = 21;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// const EXTRAS_COUNT = 2;

const cards = generateCards(FILM_COUNT);
const categories = generateCategories();


// const firstCard = cards[0];
// const firstCardCommentsAmmount = cards[0].commentsAmmount;

const info = generateAmmountInfo();

// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
// const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new StatusComponent(info).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(categories).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const filmsElement = new FilmsComponent();

render(siteMainElement, filmsElement.getElement(), RenderPosition.BEFOREEND);


const allFilmsElement = siteMainElement.querySelector(`.films-list`);
const filmsListElement = filmsElement.getElement().querySelector(`.films-list__container`);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

cards.slice(0, showingFilmsCount).forEach((card) => render(filmsListElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

render(allFilmsElement, new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = filmsElement.getElement().querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  cards.slice(prevFilmsCount, showingFilmsCount).forEach((card) => render(filmsListElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= cards.length) {
    loadMoreButton.remove();
  }
});

render(filmsElement.getElement(), new RatedFilmsComponent().getElement(), RenderPosition.BEFOREEND);
render(filmsElement.getElement(), new CommentedFilmsComponent().getElement(), RenderPosition.BEFOREEND);

// const topRatedFilmsListElement = filmsElement.querySelector(`.films-list--extra-rated .films-list__container`
// );
// const topCommentedFilmsListElement = filmsElement.querySelector(`.films-list--extra-commented .films-list__container`
// );

// for (let i = 0; i < EXTRAS_COUNT; i++) {
//   render(topRatedFilmsListElement, createFilmCardTemplate(cards[i]), `beforeend`);
// }

// for (let i = 0; i < EXTRAS_COUNT; i++) {
//   render(topCommentedFilmsListElement, createFilmCardTemplate(cards[i]), `beforeend`);
// }

// render(siteFooterElement, createFilmPopup(firstCard), `beforeend`);
// const popup = document.querySelector(`.film-details`);
// const commentsList = popup.querySelector(`.film-details__comments-list`);

// render(commentsList, generateComments(firstCardCommentsAmmount), `beforeend`);

// const popupCloseButton = popup.querySelector(`.film-details__close-btn`);

// popupCloseButton.addEventListener(`click`, () => {
//   popup.remove();
// });
