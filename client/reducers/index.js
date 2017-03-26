import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentLetterIndex from './currentLetterIndex';
import letters from './letters';
import options from './options';
import score from './score';

const rootReducer = combineReducers({
  currentLetterIndex,
  letters,
  options,
  score,
  routing: routerReducer
});

export default rootReducer;
