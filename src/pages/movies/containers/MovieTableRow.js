import React from 'react';
import { connect } from 'react-redux';
import { DataCell } from '../../../components/molecules/DataCell';
import { HeaderCell } from '../../../components/molecules/HeaderCell';
import { TableRow } from '../../../components/organisms/TableRow';
import { fetchMovieDetail } from '../modules/actions';

function mapDispatchToProps (dispatch) {
  return {
    // selectMovie (movie) {
    //   dispatch(selectMovie(movie))
    // }
    fetchMovieDetail (movieId) {
      dispatch(fetchMovieDetail(movieId))
    }
  }
}

const MovieTableRowContainer = ({ movie, fetchMovieDetail }) => {
  const {
    id,
    title,
    release_date,
    popularity,
    vote_average,
  } = movie;
  const handleClick = () => {fetchMovieDetail(id)}
  
  return (
    <TableRow onComponentClick={handleClick}>
      <HeaderCell content={title} />
      <DataCell content={new Date(release_date).toString().split(' ').slice(1, 4).join(' ')} />
      <DataCell content={popularity} />
      <DataCell content={vote_average} />
    </TableRow>
  )
}

export default connect(null, mapDispatchToProps)(MovieTableRowContainer);