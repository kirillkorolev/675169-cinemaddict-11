import API from "./api.js";
import {generateAmmountInfo} from "./mock/user-status";
import {generateCards} from "./mock/film-card";
// import {generateCategories} from "./mock/menu";

import PageController from "./controllers/page.js";
import StatusComponent from "./components/user-status.js";
import MenuComponent from "./components/menu.js";

import FilterController from "./controllers/filter.js";

import FilmsComponent from "./components/films.js";
import NoFilmsComponent from "./components/no-films.js";
import FilmsStatistic from "./components/films-statistic.js";
import StatisticsComponent from "./components/statistics.js";
import MoviesModel from "./models/movies.js";

// import {renderPopupsAndCards} from "./controllers/page.js";

import RatedFilmsComponent from "./components/rated-films.js";
import CommentedFilmsComponent from "./components/commented-films.js";


import {RenderPosition, render, replace} from "./utils/render.js";

const AUTHORIZATION = `Basic er883jdzbdw`;

const FILM_COUNT = 11;
// const EXTRAS_COUNT = 2;

// const categories = generateCategories();

// const info = generateAmmountInfo(FILM_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();

render(siteHeaderElement, new StatusComponent(44), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();
render(siteMainElement, new MenuComponent(), RenderPosition.BEFOREEND);

const cardsMocks = generateCards(FILM_COUNT);
const api = new API(AUTHORIZATION);

// moviesModel.setMovies(cardsMocks);

const filmsSectionComponent = new FilmsComponent();
const pageController = new PageController(filmsSectionComponent, moviesModel);

const FilmsStatisticElement = new FilmsStatistic(FILM_COUNT);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticElement, FilmsStatisticElement, RenderPosition.BEFOREEND);
// pageController.render(cardsMocks);
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

if (cardsMocks > 0) {


  const ratedFilmsComponent = new RatedFilmsComponent();
  const commentedFilmsComponent = new CommentedFilmsComponent();


  // const extrasMocks = cardsMocks.slice(0, EXTRAS_COUNT);
  // const renderExtrasFilms = (filmsListElement, cards) => {
  //   cards.forEach((card) => render(filmsListElement, card, RenderPosition.BEFOREEND));
  // };

  render(filmsSectionComponent.getElement(), ratedFilmsComponent, RenderPosition.BEFOREEND);
  render(filmsSectionComponent.getElement(), commentedFilmsComponent, RenderPosition.BEFOREEND);

  // renderExtrasFilms(ratedFilmsComponent.getElement().querySelector(`.films-list__container`), extrasMocks);
  // renderExtrasFilms(commentedFilmsComponent.getElement().querySelector(`.films-list__container`), extrasMocks);


} else {
  const noFilmsComponent = new NoFilmsComponent();
  replace(noFilmsComponent, filmsSectionComponent);
}

// const statistics = new StatisticsComponent(moviesModel._movies);
// render(siteMainElement, statistics, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.render();
  });
