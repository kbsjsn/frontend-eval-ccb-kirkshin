import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPopular,
  fetchTopRated,
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
      <div className="select-movie-list">
        <div className="select-movie-list-label">
          Select Movies List
        </div>
        <div className="select-movie-list-options">
          <input type="radio" id="now-playing" value="now-playing" name="select-movie-list" defaultChecked></input>
          <label htmlFor="now-playing">Now Playing</label>
          <input type="radio" id="popular" value="popular" name="select-movie-list"></input>
          <label htmlFor="popular">Popular</label>
          <input type="radio" id="top-rated" value="top-rated" name="select-movie-list"></input>
          <label htmlFor="top-rated">Top Rated</label>
        </div>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(SearchBar);