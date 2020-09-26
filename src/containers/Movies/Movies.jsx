import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MovieItem from "../../components/Movies/MovieItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import { getMovies } from "../../store/actions/movies";

const Movies = () => {
  const moviesList = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (moviesList.length === 0) {
      dispatch(getMovies())
    }
  }, [dispatch, moviesList.length]);

  return (
    <div className="container pt-5">
      <div className="row">
        {loading ? <Spinner /> : moviesList.map((movie) => (
          <MovieItem
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
};

export default Movies;
