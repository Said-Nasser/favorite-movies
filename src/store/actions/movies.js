import axios from 'axios';
import * as actionTypes from "./actionTypes";

/**
 * Fetch Movies
 */
export const toggleFav = (id) => {
  return { type: actionTypes.TOGGLE_FAV, productId: id };
};

export const getMoviesStart = () => {
  return {
    type: actionTypes.GET_MOVIES_START,
  };
};

export const getMoviesSuccess = (movies) => {
  return {
    type: actionTypes.GET_MOVIES_SUCCESS,
    movies: movies,
  };
};

export const getMoviesFail = (error) => {
  return {
    type: actionTypes.GET_MOVIES_FAIL,
    error: error,
  };
};

export const getMovies = () => {
  return (dispatch) => {
      dispatch(getMoviesStart())
      axios
        .get("https://yts.mx/api/v2/list_movies.json", {
          params: {
            order_by: "desc",
            page: "1",
            sort_by: "date_added",
            with_rt_ratings: "true",
          },
        })
        .then((res) => {
          dispatch(getMoviesSuccess(res.data.data.movies));
        })
        .catch((err) => getMoviesFail(err));
  };
};
