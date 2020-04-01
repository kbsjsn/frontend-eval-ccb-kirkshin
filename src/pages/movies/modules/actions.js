import { 
  FETCH_MOVIES_STARTED, 
  FETCH_MOVIES_FAILED,
  FETCH_NOW_PLAYING_SUCCEEDED,
  FETCH_POPULAR_SUCCEEDED,
  FETCH_TOP_RATED_SUCCEEDED,
  FETCH_MORE_MOVIES_STARTED,
  FETCH_MORE_MOVIES_SUCCEEDED,
  SORT_BY,
  TOGGLE_SORT_ORDER,
  SEARCH_MOVIES,
  SHOW_ALL_MOVIES,
  SELECT_MOVIE,
  CLOSE_DETAIL_PANE,
  FETCH_MOVIE_DETAIL_STARTED,
  FETCH_MOVIE_DETAIL_SUCCEEDED
} from './constants';

function fetchMoviesStarted () {
  return { type: FETCH_MOVIES_STARTED }
}

function fetchMoviesFailed(err) {
  return { type: FETCH_MOVIES_FAILED, err }
}

function fetchMovies(url) {
  return fetch (url)
    .then(res => res.json())
}

function fetchNowPlayingSucceeded(movieData) {
  return { type: FETCH_NOW_PLAYING_SUCCEEDED, movieData }
}

function fetchPopularSucceeded(movieData) {
  return { type: FETCH_POPULAR_SUCCEEDED, movieData }
}

function fetchTopRatedSucceeded(movieData) {
  return { type: FETCH_TOP_RATED_SUCCEEDED, movieData }
}

function fetchMoreMoviesStarted () {
  return { type: FETCH_MORE_MOVIES_STARTED }
}

function fetchMoreMoviesSucceeded(movieData) {
  return { type: FETCH_MORE_MOVIES_SUCCEEDED, movieData }
}

function fetchMovieDetailsStarted () {
  return { type: FETCH_MOVIE_DETAIL_STARTED }
}

function fetchMovieDetailsSucceeded (movieDetail) {
  return { type: FETCH_MOVIE_DETAIL_SUCCEEDED, movieDetail }
}

export function fetchNowPlaying () {
  return function (dispatch) {
    dispatch(fetchMoviesStarted());

    return fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(data => dispatch(fetchNowPlayingSucceeded(data.results)))
      .catch(err => dispatch(fetchMoviesFailed(err)))
  }
}

export function fetchPopular () {
  return function (dispatch) {
    dispatch(fetchMoviesStarted());

    return fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(data => dispatch(fetchPopularSucceeded(data.results)))
      .catch(err => dispatch(fetchMoviesFailed(err)))
  }
}

export function fetchTopRated () {
  return function (dispatch) {
    dispatch(fetchMoviesStarted());

    return fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(data => dispatch(fetchTopRatedSucceeded(data.results)))
      .catch(err => dispatch(fetchMoviesFailed(err)))
  }
}

export function fetchMoreMovies () {
  return function (dispatch, getState) {
    dispatch(fetchMoreMoviesStarted())

    const nextPage = getState().tmdbPageNum + 1;
    return fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${nextPage}`)
      .then(data => dispatch(fetchMoreMoviesSucceeded(data.results)))
      .catch(err => dispatch(fetchMoviesFailed(err)))
  }
}

export function fetchMovieDetail (movieId) {
  return function (dispatch) {
    dispatch(fetchMovieDetailsStarted());

    return fetchMovies(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  }
}

export function sortBy (sortField) {
  return { type: SORT_BY, sortField }
}

export function toggleSortOrder () {
  return { type: TOGGLE_SORT_ORDER }
}

export function selectMovie(selectedMovie) {
  return { type: SELECT_MOVIE, selectedMovie }
}

export function closeDetailPane() {
  return { type: CLOSE_DETAIL_PANE }
}

export function searchMovies (searchQuery) {
  return { type: SEARCH_MOVIES, searchQuery }
}

export function showAllMovies () {
  return { type: SHOW_ALL_MOVIES }
}