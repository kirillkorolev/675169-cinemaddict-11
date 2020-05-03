import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";

import PageController from "./controllers/page.js";
import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";

import FilmsComponent from "./components/films.js";
import NoFilmsComponent from "./components/no-films.js";
import FilmsStatistic from "./components/films-statistic.js";
// import {renderPopupsAndCards} from "./controllers/page.js";

import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";


import {RenderPosition, render} from "./utils/render.js";

const FILM_COUNT = 11;
// const EXTRAS_COUNT = 2;

const categories = generateCategories();

const info = generateAmmountInfo();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new StatusComponent(info), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(categories), RenderPosition.BEFOREEND);

const cardsMocks = generateCards(FILM_COUNT);
const filmsSectionComponent = new FilmsComponent();
const pageController = new PageController(filmsSectionComponent);

const FilmsStatisticElement = new FilmsStatistic(FILM_COUNT);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticElement, FilmsStatisticElement, RenderPosition.BEFOREEND);
pageController.render(cardsMocks);

if (cardsMocks.length > 0) {
  render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

  const ratedFilmsComponent = new RatedFilmsComponent();
  const commentedFilmsComponent = new CommentedFilmsComponent();

  // const extrasMocks = cardsMocks.slice(0, EXTRAS_COUNT);

  // const renderExtrasFilms = (filmsListElement, cards) => {
  //   cards.forEach((card) => renderPopupsAndCards(filmsListElement, card));
  // };

  render(filmsSectionComponent.getElement(), ratedFilmsComponent, RenderPosition.BEFOREEND);
  render(filmsSectionComponent.getElement(), commentedFilmsComponent, RenderPosition.BEFOREEND);

  // renderExtrasFilms(ratedFilmsComponent.getElement().querySelector(`.films-list__container`), extrasMocks);
  // renderExtrasFilms(commentedFilmsComponent.getElement().querySelector(`.films-list__container`), extrasMocks);
} else {
  const noFilmsComponent = new NoFilmsComponent();
  render(siteMainElement, noFilmsComponent, RenderPosition.BEFOREEND);
}

