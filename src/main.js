import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";
import {generateCommentsArray} from "./mock/comment";

import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import NoFilmsComponent from "./components/no-films.js";
import NoFilmsStatistic from "./components/no-films-statictic.js";
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
  const removePopup = () => {
    siteFooterElement.removeChild(popupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const popupComponent = new PopupComponent(card);
  const closeButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const commentsList = popupComponent.getElement().querySelector(`.film-details__comments-list`);

  const onPosterClick = () => {
    siteFooterElement.appendChild(popupComponent.getElement());

    const commentsAmmount = card.commentsAmmount;
    const commentsArray = generateCommentsArray(commentsAmmount);

    commentsArray.forEach((comment) => {
      render(commentsList, new CommentComponent(comment).getElement(), RenderPosition.BEFOREEND);
    });

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const cardComponent = new FilmCardComponent(card);
  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, onPosterClick);

  render(filmList, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (filmsElement, cards) => {

  const filmsListElement = filmsElement.getElement().querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  cards.slice(0, showingFilmsCount).forEach((card) => renderPopupsAndCarts(filmsListElement, card));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();

  if (cards.length > 0) {
    render(filmsElement.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  }

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
const noFilmsElement = new NoFilmsComponent();
const noFilmsStatisticElement = new NoFilmsStatistic();

const cardsMocks = generateCards(FILM_COUNT);

if (cardsMocks.length > 0) {
  render(siteMainElement, filmsSectionElement.getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, noFilmsElement.getElement(), RenderPosition.BEFOREEND);
  render(siteFooterElement, noFilmsStatisticElement.getElement(), RenderPosition.BEFOREEND)
}

renderFilms(filmsSectionElement, cardsMocks);

const ratedFilms = new RatedFilmsComponent();
const commentedFilms = new CommentedFilmsComponent();

const extrasMocks = cardsMocks.slice(0, 2);
const renderExtrasFilms = (filmsListElement, cards) => {
  cards.forEach((card) => renderPopupsAndCarts(filmsListElement, card));
};

if (cardsMocks.length > 0) {
  render(filmsSectionElement.getElement(), ratedFilms.getElement(), RenderPosition.BEFOREEND);
  render(filmsSectionElement.getElement(), commentedFilms.getElement(), RenderPosition.BEFOREEND);

  renderExtrasFilms(ratedFilms.getElement().querySelector(`.films-list__container`), extrasMocks);
  renderExtrasFilms(commentedFilms.getElement().querySelector(`.films-list__container`), extrasMocks);

}


