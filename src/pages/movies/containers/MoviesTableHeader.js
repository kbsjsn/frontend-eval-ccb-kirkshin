import React from 'react';
import { connect } from 'react-redux';
import { HeaderCell } from '../../../components/molecules/HeaderCell';
import { sortBy, toggleSortOrder } from '../modules/actions';

function mapStateToProps (state) {
  const { sortField, sortOrder } = state
  return {
    sortField,
    sortOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortBy (sortField) {
      dispatch(sortBy(sortField))
    },
    toggleSortOrder () {
      dispatch(toggleSortOrder())
    }
  }
}

// sort feature...

const MoviesTableHeaderContainer = ({ sortField, sortOrder, sortBy, toggleSortOrder }) => {
  const headings = [
    'Title',
    'Release Date',
    'Popularity',
    'Vote Average'
  ];

  return (
    // <tr className="row-heading">
    <>
      {
        headings.map((heading, ind) => 
          <HeaderCell key={`head-${ind}`} 
            content={heading} 
            sortField={sortField}
            sortOrder={sortOrder} 
            sortBy={sortBy}
            toggleSortOrder={toggleSortOrder}
          />
        )
      }
    </>
    // </tr>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesTableHeaderContainer)