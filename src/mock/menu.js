const categoriesList = [`All`, `Watchlist`, `History`, `Favourites`];

const generateCategories = () => {
  return categoriesList.map((it) => {
    return {
      categorieName: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateCategories};
