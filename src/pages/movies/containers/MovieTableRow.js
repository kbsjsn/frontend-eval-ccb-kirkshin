import React from 'react';
import { connect } from 'react-redux';
import { DataCell } from '../../../components/molecules/DataCell';
import { HeaderCell } from '../../../components/molecules/HeaderCell';
import { TableRow } from '../../../components/organisms/TableRow';
import { selectMovie } from '../modules/actions';

function mapDispatchToProps (dispatch) {
  return {
    selectMovie (movie) {
      dispatch(selectMovie(movie))
    }
  }
}

const MovieTableRowContainer = ({ movie, selectMovie }) => {
  const handleClick = () => {selectMovie(movie)}
  
  return (
    <TableRow onComponentClick={handleClick}>
      <HeaderCell content={movie.title} />
      <DataCell content={movie.release_date} />
      <DataCell content={movie.popularity} />
      <DataCell content={movie.vote_average} />
    </TableRow>
  )
}

export default connect(null, mapDispatchToProps)(MovieTableRowContainer);