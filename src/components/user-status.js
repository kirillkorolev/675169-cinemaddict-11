// const statusList = [`Novice`, `Fan`, `Movie Buff`];

// const randomInteger = (min, max) => {
//   let rand = min - 0.5 + Math.random() * (max - min + 1);
//   return Math.round(rand);
// };

// const watchedMoviesAmmount = randomInteger(0, 100);

// //console.log(watchedMoviesAmmount);

// const getRaiting = (raiting) => {
//   const stat = ``;
//   if (raiting === 0) {
//     stat = ``;
//   } else if (raiting <= 10 && raiting >= 1) {
//     stat = `Fan`;
//   } else if (raiting > 10) {
//     stat = `Movie buff`;
//   }
//   return stat;
// };

// console.log(getRaiting(5));

export const createUserStatusTemplate = () => {
  const status = `Movie Buff`;

  return `
    <section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};
