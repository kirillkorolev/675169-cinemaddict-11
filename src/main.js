import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";

import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import FilmCardComponent from "./components/film-card.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";
import PopupComponent from "./components/popup.js";
import {RenderPosition, render} from "./utils";

const FILM_COUNT = 21;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRAS_COUNT = 2;

const cards = generateCards(FILM_COUNT);
const categories = generateCategories();

const info = generateAmmountInfo();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new StatusComponent(info).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(categories).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const filmsElement = new FilmsComponent();

render(siteMainElement, filmsElement.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = filmsElement.getElement().querySelector(`.films-list__container`);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

cards.slice(0, showingFilmsCount).forEach((card) => render(filmsListElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

render(filmsElement.getElement(), new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = filmsElement.getElement().querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  cards.slice(prevFilmsCount, showingFilmsCount).forEach((card) => render(filmsListElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= cards.length) {
    loadMoreButton.remove();
  }
});

const ratedFilms = new RatedFilmsComponent();
const commentedFilms = new CommentedFilmsComponent();

render(filmsElement.getElement(), ratedFilms.getElement(), RenderPosition.BEFOREEND);
render(filmsElement.getElement(), commentedFilms.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(ratedFilms.getElement().querySelector(`.films-list__container`), new FilmCardComponent(cards[i]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(commentedFilms.getElement().querySelector(`.films-list__container`), new FilmCardComponent(cards[i]).getElement(), RenderPosition.BEFOREEND);
}


siteMainElement.addEventListener(`click`, (event) => {
  const target = event.target.closest(`.film-card`);
  let title = target.querySelector(`.film-card__title`).textContent;
  let posterLink = target.querySelector(`.film-card__poster`).src;
  let commentsAmmount = target.querySelector(`.film-card__comments`).textContent;

  if (target) {
    const popup = new PopupComponent(cards[0]);

    siteFooterElement.appendChild(popup.getElement());
    popup.getElement().querySelector(`.film-details__title`).textContent = title;
    popup.getElement().querySelector(`.film-details__poster-img`).src = posterLink;
    popup.getElement().querySelector(`.film-details__comments-count`).textContent = commentsAmmount;

    const popupCloseButton = popup.getElement().querySelector(`.film-details__close-btn`);

    popupCloseButton.addEventListener(`click`, () => {
      siteFooterElement.removeChild(popup.getElement());
    });
  }
});


