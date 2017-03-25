import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentLetter from './currentLetter';
import letterCase from './letterCase';
import letterStyle from './letterStyle';
import letters from './letters';
import sortBy from './sortBy';
import soundStyle from './soundStyle';

const rootReducer = combineReducers({
  currentLetter,
  letterCase,
  letterStyle,
  letters,
  sortBy,
  soundStyle,
  routing: routerReducer
});

export default rootReducer;
