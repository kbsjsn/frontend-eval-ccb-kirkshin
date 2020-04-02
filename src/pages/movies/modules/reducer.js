import { 
  FETCH_MOVIES_STARTED,
  FETCH_MOVIES_FAILED,
  FETCH_NOW_PLAYING_SUCCEEDED,
  SORT_BY,
  TOGGLE_SORT_ORDER,
  SEARCH_MOVIES,
  SHOW_ALL_MOVIES,
  FETCH_MORE_MOVIES_STARTED,
  FETCH_MORE_MOVIES_SUCCEEDED,
  CLOSE_DETAIL_PANE,
  FETCH_MOVIE_DETAIL_STARTED,
  FETCH_MOVIE_DETAIL_SUCCEEDED
} from './constants';

function sortMovies (moviesData, sortField, sortOrder) {
  const copyMoviesData = [...moviesData]
  return copyMoviesData.sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'release_date') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
      if (sortOrder) return aVal.valueOf() - bVal.valueOf()
      return bVal.valueOf() - aVal.valueOf()
    }
    else if (sortField === 'title') {
      aVal = aVal.toUpperCase();
      bVal = bVal.toUpperCase();
      // remove 'the', 'a', 'an'
      const articles = {
        'THE': true,
        'AN': true,
        'A': true
      }
      if (articles[aVal.split(' ')[0]]) aVal = aVal.split(' ').splice(1).join('')
      if (articles[bVal.split(' ')[0]]) bVal = bVal.split(' ').splice(1).join('')

      if (sortOrder) {
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
      }
      else {
        if (aVal < bVal) return 1;
        if (aVal > bVal) return -1;
      }
      // if equal
      return 0;
    }
    else {
      if (sortOrder) return a[sortField] - b[sortField];
      return b[sortField] - a[sortField];
    }
  })
}

export const initialState = {
  moviesNowPlaying: [],
  moviesPopular: [],
  moviesTopRated: [],
  currentMovieList: null,
  sortField: null,
  sortOrder: true,
  isLoadingMovies: false,
  isLoadingMoreMovies: false,
  tmdbPageNum: 1,
  movieDetail: null,
  isLoadingMovieDetail: false,
}

export function reducer (state = initialState, action) {
  let { sortOrder } = state;

  switch (action.type) {
    case FETCH_MOVIES_STARTED:
      return {
        ...state,
        isLoadingMovies: true
      }
    case FETCH_NOW_PLAYING_SUCCEEDED:
      return {
        ...state,
        moviesNowPlaying: action.movieData,
        currentMovieList: action.movieData,
        // currentMovieList: 'now-playing',
        isLoadingMovies: false
      }
    case FETCH_MOVIES_FAILED:
      console.error(action.err)
      return {
        ...state,
        movies: action.err,
        currentMovieList: null,
        isLoadingMovies: false
      }
    case FETCH_MOVIE_DETAIL_STARTED: 
      return {
        ...state,
        isLoadingMovieDetail: true
      }
    case FETCH_MOVIE_DETAIL_SUCCEEDED:
      return {
        ...state,
        isLoadingMovieDetail: false,
        movieDetail: action.movieDetail
      }
    case SORT_BY:
      sortOrder = true;
      return {
        ...state,
        currentMovieList: sortMovies(state.currentMovieList, action.sortField, sortOrder),
        sortOrder,
        sortField: action.sortField
      }
    case TOGGLE_SORT_ORDER:
      sortOrder = !sortOrder;
      return {
        ...state,
        currentMovieList: sortMovies(state.currentMovieList, state.sortField, sortOrder),
        sortOrder
      }
    case SEARCH_MOVIES:
      let { moviesNowPlaying } = state;
      let { searchQuery } = action;
      searchQuery = searchQuery.toLowerCase();
      const filteredMovies = moviesNowPlaying.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery)
      })
      return {
        ...state,
        currentMovieList: filteredMovies,
        sortField: null
      }
    case SHOW_ALL_MOVIES: 
      return {
        ...state,
        currentMovieList: state.moviesNowPlaying,
        sortField: null
      }
    case FETCH_MORE_MOVIES_STARTED:
      return {
        ...state,
        isLoadingMoreMovies: true
      }
    case FETCH_MORE_MOVIES_SUCCEEDED:
      const updatedData = [...state.moviesNowPlaying, ...action.movieData]
      return {
        ...state,
        tmdbPageNum: state.tmdbPageNum + 1,
        moviesNowPlaying: updatedData,
        currentMovieList: updatedData,
        isLoadingMoreMovies: false
      }
    // case SELECT_MOVIE:
    //   return {
    //     ...state,
    //     movieDetail: action.selectedMovie
    //   }
    case CLOSE_DETAIL_PANE:
      return {
        ...state,
        movieDetail: null
      }
    default: 
      return {
        ...state
      }
  }
}