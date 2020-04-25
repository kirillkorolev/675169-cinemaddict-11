import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
import {generateCategories} from "./mock/menu";
// import {generateCommentsArray} from "./mock/comment";

import PageController from "./controllers/page.js";
import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import FilmsComponent from "./components/films.js";
import NoFilmsComponent from "./components/no-films.js";
import FilmsStatistic from "./components/films-statistic.js";

import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";


import {RenderPosition, render} from "./utils/render.js";

const FILM_COUNT = 11;
const EXTRAS_COUNT = 2;

const categories = generateCategories();

const info = generateAmmountInfo();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new StatusComponent(info), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(categories), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const FilmsStatisticComponent = new FilmsStatistic(FILM_COUNT);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticElement, FilmsStatisticComponent, RenderPosition.BEFOREEND);

const cardsMocks = generateCards(FILM_COUNT);

const filmsSectionComponent = new FilmsComponent();

const pageController = new PageController(filmsSectionComponent);

if (cardsMocks.length > 0) {

  render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);
  pageController.render(cardsMocks);

  const ratedFilms = new RatedFilmsComponent();
  const commentedFilms = new CommentedFilmsComponent();
  const extrasMocks = cardsMocks.slice(0, EXTRAS_COUNT);

  render(filmsSectionComponent.getElement(), ratedFilms, RenderPosition.BEFOREEND);
  render(filmsSectionComponent.getElement(), commentedFilms, RenderPosition.BEFOREEND);

  const ratedFilmsController = new PageController(ratedFilms);
  const commentedFilmsController = new PageController(commentedFilms);
  ratedFilmsController.render(extrasMocks);
  commentedFilmsController.render(extrasMocks);
} else {
  const noFilmsElement = new NoFilmsComponent();
  render(siteMainElement, noFilmsElement, RenderPosition.BEFOREEND);
}

