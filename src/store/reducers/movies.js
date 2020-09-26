import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movies: [],
  error: null,
  loading: false,
};

const getMoviesStart = (state, action) => ({
  ...state,
  error: null,
  loading: true,
});
const getMoviesFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});
const getMoviesSuccess = (state, action) => ({
  ...state,
  error: null,
  loading: false,
  movies: [...action.movies.map((movie) => ({ ...movie, isFavourite: false }))],
});

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FAV:
      const movieIndex = state.movies.findIndex(
        (p) => p.id === action.productId
      );
      const newFavStatus = !state.movies[movieIndex].isFavorite;
      const updatedMovies = [...state.movies];
      updatedMovies[movieIndex] = {
        ...state.movies[movieIndex],
        isFavorite: newFavStatus,
      };
      return {
        ...state,
        movies: updatedMovies,
      };
    case actionTypes.GET_MOVIES_START:
      return getMoviesStart(state, action);
    case actionTypes.GET_MOVIES_FAIL:
      return getMoviesFail(state, action);
    case actionTypes.GET_MOVIES_SUCCESS:
      return getMoviesSuccess(state, action);
    default:
      return state;
  }
};

export default moviesReducer;
