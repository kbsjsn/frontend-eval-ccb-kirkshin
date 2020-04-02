import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { initialState, reducer } from '../pages/movies/modules/reducer';
import testMovieData from './testMovieData.json';
import MovieTable from '../pages/movies/containers/MoviesTable';
import axios from 'axios';
jest.mock('axios');

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}

// beforeEach(() => {
//   axios.get = jest.fn(() => Promise.resolve({ currentMovieList: testMovieData }))
// })


test('can render movie table with custom initial state', () => {
    const { getByText } = renderWithRedux(<MovieTable />)

    axios.get.mockResolvedValueOnce({
      currentMovieList: testMovieData
    })

    // await waitFor(() => screen.getByRole('section'))

    expect(getByText('Loading...')).toBeInTheDocument()
})