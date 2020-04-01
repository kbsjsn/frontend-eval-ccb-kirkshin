import React from 'react';
import { connect } from 'react-redux';
import MoviesTable from './containers/MoviesTable'
import SearchBar from './containers/SearchBar';
import MovieDetailPane from './containers/MovieDetailPane';
import { MoviePageLayout } from '../../components/templates/MoviePageLayout';

function mapStateToProps (state) {
  const { selectedMovie } = state;
  return {
    selectedMovie
  }
}

const MoviesPageContainer = ({ selectedMovie }) => {
  return (
    <MoviePageLayout style={selectedMovie ? 'expanded-layout' : 'default-layout' } >
      <MovieDetailPane />
      <SearchBar />
      <MoviesTable />
    </MoviePageLayout>
  )
};

export default connect(mapStateToProps)(MoviesPageContainer)