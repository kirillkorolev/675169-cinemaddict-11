import {randomElement, randomInteger, shuffle} from "../utils.js";

const FILM_TITLES = [`The dance of life`, `Santa Clasus`, `Popey the Sailor`, `Terminator`, `Taxi`, `Lucky 7`, `Shining`];
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
const MAX_TEXT_LENGTH = 140;

const createFullDescription = (arr) => {

  let basicText = shuffle(arr.slice());
  let newArr = [];
  let number = randomInteger(1, 5);

  for (let i = 0; i <= number; i++) {

    let elem = basicText.pop() + `.`;
    newArr.push(elem);
  }

  let fullText = newArr.join(``);

  if (fullText.length >= MAX_TEXT_LENGTH) {
    fullText = fullText.slice(0, 139) + `...`;
  }
  return fullText;
};

const randomRaiting = () => (Math.random() * 10).toFixed(1);
const randomDuration = () => randomInteger(0, 3) + `h ` + randomInteger(0, 59) + `m`;

const generateCard = () => {
  return {
    title: FILM_TITLES[randomElement(FILM_TITLES)],
    raiting: randomRaiting(),
    year: randomInteger(1950, 2000),
    duration: randomDuration(),
    genre: genreList[randomElement(genreList)],
    description: createFullDescription(descriptionArr),
    poster: posters[randomElement(posters)],
    commentsAmmount: randomInteger(0, 5)
  };
};

const generateCards = (count) => {
  return new Array(count).fill(``).map(generateCard);
};


export {generateCards};
