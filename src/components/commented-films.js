import AbstractComponent from "./abstract-component.js";

const createCommentedFilmsElement = () => {
  return (`<section class="films-list--extra films-list--extra-commented">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container"></div>
</section>`);
};

export default class CommentedFilms extends AbstractComponent {
  getTemplate() {
    return createCommentedFilmsElement();
  }
}
