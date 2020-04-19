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

const generateCommentsArray = (count) => {
  let arr = new Array(count).fill(``).map(generateComment);
  return arr;
};

export {generateCommentsArray};

