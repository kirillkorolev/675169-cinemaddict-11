export const createCommentMarkup = (comment) => {
  const {avatar, name, text, date, time} = comment;

  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${avatar}.png" width="55" height="55" alt="emoji-${avatar}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
          <span class="film-details__comment-day">${date} ${time}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `);
};

import {randomElement, randomInteger} from "../utils.js";

const avatarsList = [`smile`, `sleeping`, `puke`, `angry`];
const nameList = [`Tim Macoveev`, `John Doe`, `Henry Rollins`, `Yan McKay`, `Glen Danzig`];
const textsList = [`Interesting setting and a good cast`, `we understand you’ve probably got some questions`, `what these changes mean for`, `announced that shops selling non-essential items`];

const generateComment = () => {
  return {
    avatar: avatarsList[randomElement(avatarsList)],
    name: nameList[randomElement(nameList)],
    text: textsList[randomElement(textsList)],
    date: `20` + randomInteger(17, 20) + `/` + randomInteger(1, 24) + `/` + randomInteger(1, 31),
    time: randomInteger(1, 24) + `:` + randomInteger(0, 59)
  };
};

const generateComments = (count) => {
  let abc = new Array(count).fill(``).map(generateComment);
  return abc.map((it) => createCommentMarkup(it)).join(`\n`);
};

export {generateComments};
