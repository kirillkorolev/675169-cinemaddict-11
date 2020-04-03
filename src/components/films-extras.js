export const createExtrasElement = () => {
  return `
    <section class="films-list--extra films-list--extra-rated">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
    </section>
    <section class="films-list--extra films-list--extra-commented">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
    </section>
  `;
};
