import AbstractSmartComponent from "./abstract-smart-component.js";
import {createStatus} from "../utils/common.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {StatisticInterval} from "../const.js";

const createIntervalMarkup = () => {
  return (`<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
  <p class="statistic__filters-description">Show stats:</p>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticInterval.ALL}" value="${StatisticInterval.ALL}" checked>
  <label for="statistic-${StatisticInterval.ALL}" data-id="${StatisticInterval.ALL}" class="statistic__filters-label">${StatisticInterval.ALL}</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticInterval.TODAY}" value="${StatisticInterval.TODAY}">
  <label for="statistic-${StatisticInterval.TODAY}" data-id="${StatisticInterval.TODAY}" class="statistic__filters-label">${StatisticInterval.TODAY}</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticInterval.WEEK}" value="${StatisticInterval.WEEK}">
  <label for="statistic-${StatisticInterval.WEEK}" data-id="${StatisticInterval.WEEK}" class="statistic__filters-label">${StatisticInterval.WEEK}</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticInterval.MONTH}" value="${StatisticInterval.MONTH}">
  <label for="statistic-${StatisticInterval.MONTH}" data-id="${StatisticInterval.MONTH}" class="statistic__filters-label">${StatisticInterval.MONTH}</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticInterval.YEAR}" value="${StatisticInterval.YEAR}">
  <label for="statistic-${StatisticInterval.YEAR}" data-id="${StatisticInterval.YEAR}" class="statistic__filters-label">${StatisticInterval.YEAR}</label>
</form>`);
};


export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;
    this._movies = this._moviesModel.getMovies();

    this._activeInterval = StatisticInterval.ALL;
    this._changeIntervalHandler();

    this._status = 0;
    this._duration = [];
    this._renderChart(this._getGenres(this._movies).labels, this._getGenres(this._movies).values);
  }

  getTemplate() {
    const watchedMovies = this._moviesModel.getMovies().filter((elem) => {
      return elem.isInWatchedList === true;
    });
    const status = createStatus(watchedMovies.length);
    const duration = this._getWatchedMoviesDuration(watchedMovies);

    // const status = createStatus(this._movies);
    // const duration = this._getWatchedMoviesDuration(this._duration);

    const topGenre = watchedMovies.length ? this._getMoviesAmountByGenre(watchedMovies)[0].genre : ``;

    return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${status}</span>
    </p>
    ${createIntervalMarkup()}
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMovies.length}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${duration.hours} <span class="statistic__item-description">h</span> ${duration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`);
  }

  _renderChart(labels, values) {
    console.log(labels, values);
    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * 5;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getWatchedMoviesDuration(movies) {
    let durationObject = {
      hours: 0,
      minutes: 0,
    };

    const totalDuration = movies.reduce((accumulator, movie) => accumulator + movie.duration, 0);

    durationObject.hours = Math.floor(totalDuration / 60);
    durationObject.minutes = totalDuration % 60;
    return durationObject;
  }

  _getMoviesGenres(movies) {
    return movies.reduce((movieGenres, movie) => {
      movie.genre.forEach((it) => {
        if (!movieGenres.includes(it)) {
          movieGenres.push(it);
        }
      });
      return movieGenres;
    }, []);
  }

  _getMoviesAmountByGenre(movies) {
    const movieGenres = this._getMoviesGenres(movies);

    return movieGenres.map((genre) => {
      return {
        genre,
        count: movies.filter((movie) => movie.genre.includes(genre)).length,
      };
    }).sort((a, b) => b.count - a.count);
  }

  _changeIntervalHandler() {
    this.getElement()
      .querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        const target = evt.target.closest(`label`);

        if (!target) {
          return;
        }

        if (target.dataset.id === this._activeInterval) {
          return;
        }

        const newInterval = target.dataset.id;

        this._rerender(newInterval);
      });
  }

  _rerender(interval) {
    const movies = this._moviesModel.getMovies();
    this._movies = this._getMoviesByDate(movies, interval);

    this._labels = this._getGenres(this._movies).labels;
    this._values = this._getGenres(this._movies).values;

    console.log(this._labels, this._values);

    this._renderChart(this._labels, this._values);
  }

  recoveryListeners() {
    this._changeIntervalHandler();
  }

  _getGenres(movies) {
    const genres = {};
    movies.forEach((movieItem) => {

      movieItem.genre.forEach((item) => {
        if (Object.keys(genres).includes(item)) {
          genres[item] += 1;
        } else {
          genres[item] = 1;
        }
      });
    });

    const genresSorting = Object.entries(genres).sort((a, b) => b[1] - a[1]);

    return {
      labels: genresSorting.map((entries) => entries[0]),
      values: genresSorting.map((entries) => entries[1])
    };
  }

  _getMoviesByDate(movies, interval) {
    let dateFrom = new Date();
    const dateTo = new Date();

    console.log(interval, StatisticInterval.WEEK);
    switch (interval) {
      case StatisticInterval.ALL:
        break;
      case StatisticInterval.TODAY:
        dateFrom.setDate(dateFrom.getDate() - 1);
        break;
      case StatisticInterval.WEEK:
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      case StatisticInterval.MONTH:
        dateFrom.setMonth(dateFrom.getMonth() - 1);
        break;
      case StatisticInterval.YEAR:
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);
        break;
    }

    // console.log(dateFrom, dateTo);

    // console.log(movies.filter((movieItem) => {
    //   console.log(movieItem.watchidngDate, dateFrom.toISOString());
    //   return movieItem.isInWatchedList && movieItem.watchidngDate >= dateFrom.toISOString();
    // }));

    return movies.filter((movieItem) => movieItem.isInWatchedList && movieItem.watchidngDate >= dateFrom.toISOString());
  }
}
