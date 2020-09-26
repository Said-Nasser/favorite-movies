import React from "react";
import { useSelector } from "react-redux";

import FavoriteItem from "../../components/Favorites/FavoriteItem";

const Favorites = () => {
  const favoriteMovies = useSelector((state) =>
    state.movies.movies.filter((movie) => movie.isFavorite)
  );
  let content = <p className="placeholder" style={{textAlign: 'center', marginTop: '5rem'}}>Got no favorites yet!</p>;
  if (favoriteMovies.length > 0) {
    content = (
      <div className="container pt-5">
        <div className="row">
          {favoriteMovies.map((movie) => (
            <FavoriteItem
              key={movie.id}
              id={movie.id}
              cover={movie.medium_cover_image}
              title={movie.title}
              rating={movie.rating}
              year={movie.year}
              genres={movie.genres}
              isFav={movie.isFavorite}
            />
          ))}
        </div>
      </div>
    );
  }
  return content;
};

export default Favorites;
