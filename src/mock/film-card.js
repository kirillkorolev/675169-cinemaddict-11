const filmTitles = [`The dance of life`, `Santa Clasus`, `Popey the Sailor`, `Terminator`, `Taxi`, `Lucky 7`, `Shining`];
const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
const genreList = [`Musical`, `Comedy`, `Drama`, `Western`, `Documentary`, `Horror`, `Art`];
const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const descriptionArr = descriptionText.split(`. `);

const randomElement = (arr) => Math.floor(Math.random() * arr.length);
const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
const randomRaiting = () => (Math.random() * 10).toFixed(1);

const generateCard = () => {
  return {
    title: filmTitles[randomElement(filmTitles)],
    raiting: randomRaiting(),
    year: randomInteger(1950, 2000),
    duration: `1h 55m`,
    genre: genreList[randomElement(genreList)],
    description: descriptionArr[randomElement(descriptionArr)] + `.`,
    poster: posters[randomElement(posters)],
    commentsAmmount: randomInteger(0, 5)
  };
};

const generateCards = (count) => {
  return new Array(count).fill(``).map(generateCard);
};

export {generateCards};
