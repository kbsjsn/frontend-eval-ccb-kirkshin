import React from 'react';
import { Provider } from 'react-redux';
import store from './globals/index';
import MoviesPage from './pages/movies/MoviesPage';
import './App.scss';

export default function App () { 
  return (
    <Provider store={store}>
      <MoviesPage />
    </Provider>
  )
};