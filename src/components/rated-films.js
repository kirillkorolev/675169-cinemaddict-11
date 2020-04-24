import AbstractComponent from "./abstract-component.js";

const createRatedFilmsElement = () => {
  return (`<section class="films-list--extra films-list--extra-rated">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container"></div>
</section>`);
};

export default class RatedFilms extends AbstractComponent {
  getTemplate() {
    return createRatedFilmsElement();
  }
}
