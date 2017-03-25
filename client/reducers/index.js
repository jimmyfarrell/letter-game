import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentLetter from './currentLetter';
import letters from './letters';
import sortBy from './sortBy';

const rootReducer = combineReducers({
  currentLetter,
  letters,
  sortBy,
  routing: routerReducer
});

export default rootReducer;
