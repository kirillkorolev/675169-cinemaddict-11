import API from "./api.js";

import StatusComponent from "./components/user-status.js";
import FilmsComponent from "./components/films.js";
import FilmsStatistic from "./components/films-statistic.js";
import StatisticsComponent from "./components/statistics.js";

import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter.js";

import MoviesModel from "./models/movies.js";
import {RenderPosition, render} from "./utils/render.js";

const AUTHORIZATION = `Basic er883jdzbdw`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();

render(siteHeaderElement, new StatusComponent(moviesModel), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, moviesModel);

filterController.render();

const api = new API(AUTHORIZATION);

const filmsSectionComponent = new FilmsComponent();

const pageController = new PageController(filmsSectionComponent, moviesModel, api);
pageController.showLoadingMeesage();
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

// const statistics = new StatisticsComponent(moviesModel._movies);
// render(siteMainElement, statistics, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.hideLoadingMessage();

    pageController.render();
    render(siteStatisticElement, new FilmsStatistic(moviesModel), RenderPosition.BEFOREEND);
  });


