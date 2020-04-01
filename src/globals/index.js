import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../pages/movies/modules/reducer';

export default createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);