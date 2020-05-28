import API from "./api.js";
import {generateAmmountInfo} from "./mock/user-status";

import PageController from "./controllers/page.js";
import StatusComponent from "./components/user-status.js";

import FilterController from "./controllers/filter.js";

import FilmsComponent from "./components/films.js";
import FilmsStatistic from "./components/films-statistic.js";
import StatisticsComponent from "./components/statistics.js";
import MoviesModel from "./models/movies.js";

import {RenderPosition, render} from "./utils/render.js";

const AUTHORIZATION = `Basic er883jdzbdw`;

// const info = generateAmmountInfo(FILM_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();

render(siteHeaderElement, new StatusComponent(44), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, moviesModel);

filterController.render();

const api = new API(AUTHORIZATION);

const filmsSectionComponent = new FilmsComponent();

const pageController = new PageController(filmsSectionComponent, moviesModel, api);
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);


const FILM_COUNT = 11;
const FilmsStatisticElement = new FilmsStatistic(FILM_COUNT);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticElement, FilmsStatisticElement, RenderPosition.BEFOREEND);


// const statistics = new StatisticsComponent(moviesModel._movies);
// render(siteMainElement, statistics, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.render();
  });

