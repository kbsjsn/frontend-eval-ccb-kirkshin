import React from 'react';
import { connect } from 'react-redux';
import {
  searchMovies,
  showAllMovies
} from '../modules/actions'
import './SearchBar.scss';

function mapDispatchToProps(dispatch) {
  return {
    searchMovies (query) {
      dispatch(searchMovies(query))
    },
    showAllMovies () {
      dispatch(showAllMovies())
    }
  }
}

const SearchBar = ({ searchMovies, showAllMovies }) => {
  const [searchQuery, setSearchQuery] = React.useState();

  const handleInput = (e) => setSearchQuery(e.target.value);
  const handleSearch = () => searchMovies(searchQuery);
  const handleShowAll = () => {
    showAllMovies();
  }

  return (
    <div className="search">
      <input 
        className="search-input"
        onChange={handleInput} 
        placeholder="Search Listed Movies"
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      <button 
        className="search-button"
        onClick={handleShowAll}
      >Show All</button>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(SearchBar);