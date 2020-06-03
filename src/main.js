import API from "./api.js";

import {RenderPosition, render} from "./utils/render.js";
import {AUTHORIZATION, END_POINT} from "./const.js";

import StatusComponent from "./components/user-status.js";
import FilmsComponent from "./components/films.js";
import FilmsStatistic from "./components/films-statistic.js";
import StatisticsComponent from "./components/statistics.js";
import SortComponent from "./components/sort.js";
import HeaderProfileComponent from "./components/header-profile.js";

import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter.js";

import MoviesModel from "./models/movies.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();
const filterController = new FilterController(siteMainElement, moviesModel);
const sortComponent = new SortComponent();

filterController.render();

render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);

const api = new API(END_POINT, AUTHORIZATION);

const headerProfileComponent = new HeaderProfileComponent();
const filmsSectionComponent = new FilmsComponent();

render(siteHeaderElement, headerProfileComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSectionComponent, moviesModel, api, sortComponent);
pageController.showLoadingMessage();
render(siteMainElement, filmsSectionComponent, RenderPosition.BEFOREEND);

const siteStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.hideLoadingMessage();

    pageController.render();

    render(headerProfileComponent.getElement(), new StatusComponent(moviesModel), RenderPosition.AFTERBEGIN);
    const statisticsComponent = new StatisticsComponent(moviesModel);
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
    statisticsComponent.hide();
    render(siteStatisticElement, new FilmsStatistic(moviesModel), RenderPosition.BEFOREEND);

    const statisticButton = siteMainElement.querySelector(`.main-navigation__additional`);

    statisticButton.addEventListener(`click`, () => {
      if (!statisticButton.classList.contains(`main-navigation__item--active`)) {
        statisticButton.classList.add(`main-navigation__item--active`);
        statisticsComponent.show();
        filmsSectionComponent.hide();
        pageController.hide();
      } else {
        statisticButton.classList.remove(`main-navigation__item--active`);
        statisticsComponent.hide();
        filmsSectionComponent.show();
        pageController.show();
      }

    });
  });

