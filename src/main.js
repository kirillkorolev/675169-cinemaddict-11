import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";
import {generateCommentsArray} from "./mock/comment";

import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import FilmCardComponent from "./components/film-card.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";
import PopupComponent from "./components/popup.js";
import CommentComponent from "./components/comment.js";
import {RenderPosition, render} from "./utils";


const FILM_COUNT = 11;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRAS_COUNT = 2;

const categories = generateCategories();

const info = generateAmmountInfo();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new StatusComponent(info).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(categories).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const renderPopupsAndCarts = (filmList, card) => {
  const closeOnButtonClick = () => {
    siteFooterElement.removeChild(popupComponent.getElement());
  };

  const popupComponent = new PopupComponent(card);
  const closeButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, closeOnButtonClick);

  const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

  const openPopup = () => {
    siteFooterElement.appendChild(popupComponent.getElement());

    const commentAmmount = card.commentsAmmount;
    const commentsArray = generateCommentsArray(commentAmmount);

    commentsArray.forEach((comment) => {
      render(commentsList, new CommentComponent(comment).getElement(), RenderPosition.BEFOREEND);
    });
  };

  const cardComponent = new FilmCardComponent(card);
  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, openPopup);

  render(filmList, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (filmsElement, cards) => {

  const filmsListElement = filmsElement.getElement().querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  cards.slice(0, showingFilmsCount).forEach((card) => renderPopupsAndCarts(filmsListElement, card));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(filmsElement.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = prevFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    cards.slice(prevFilmsCount, showingFilmsCount).forEach((card) => renderPopupsAndCarts(filmsListElement, card));

    if (showingFilmsCount >= cards.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const filmsSectionElement = new FilmsComponent();
render(siteMainElement, filmsSectionElement.getElement(), RenderPosition.BEFOREEND);
const cardsMocks = generateCards(FILM_COUNT);

renderFilms(filmsSectionElement, cardsMocks);

const ratedFilms = new RatedFilmsComponent();
const commentedFilms = new CommentedFilmsComponent();

render(filmsSectionElement.getElement(), ratedFilms.getElement(), RenderPosition.BEFOREEND);
render(filmsSectionElement.getElement(), commentedFilms.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(ratedFilms.getElement().querySelector(`.films-list__container`), new FilmCardComponent(cardsMocks[i]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < EXTRAS_COUNT; i++) {
  render(commentedFilms.getElement().querySelector(`.films-list__container`), new FilmCardComponent(cardsMocks[i]).getElement(), RenderPosition.BEFOREEND);
}
