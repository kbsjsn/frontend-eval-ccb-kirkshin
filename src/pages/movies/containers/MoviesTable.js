import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchNowPlaying,
  fetchMoreMovies
} from '../modules/actions';
import MoviesTableHeader from './MoviesTableHeader';
import MovieTableRow from './MovieTableRow';
import './MovieTable.scss';

function mapStateToProps(state) {
  const { 
    moviesNowPlaying, 
    moviesPopular,
    moviesTopRated,
    currentMovieList,
    isLoadingMovies,
    isLoadingMoreMovies
  } = state;

  return { 
    moviesNowPlaying,
    moviesPopular,
    moviesTopRated,
    currentMovieList,
    isLoadingMovies,
    isLoadingMoreMovies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNowPlaying () {
      dispatch(fetchNowPlaying())
    },
    fetchMoreMovies () {
      dispatch(fetchMoreMovies())
    }
  }
}

const Movies = ({ 
  currentMovieList,
  isLoadingMovies,
  isLoadingMoreMovies,
  fetchNowPlaying,
  fetchMoreMovies
}) => {
  React.useEffect(() => {
    fetchNowPlaying()
  // eslint-disable-next-line
  }, []);

  // each movie obj, need to make a row 
  // once you have an array of rows, add to tbody

  let tbodyMarkup; 
  if (currentMovieList) {
    tbodyMarkup = currentMovieList.map((movie, ind) => (
      <MovieTableRow key={`movierow-${ind}`} movie={movie} />
    ))
  }

  const handleShowMoreMovies = () => fetchMoreMovies();

  return (
    <div className="container-movie-table">
      {
        isLoadingMovies 
          ? 
          'Loading...' 
          : 
          <>
            <section className="movie-table">
              <header className="movie-table-header"><MoviesTableHeader /></header>
              {tbodyMarkup}
              {isLoadingMoreMovies && 'Loading...'}
            </section>
            <button className="button-show-more-movies" onClick={handleShowMoreMovies}>Show more</button> 
          </>
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);