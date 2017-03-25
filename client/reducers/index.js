import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentLetter from './currentLetter';
import letters from './letters';
import options from './options';

const rootReducer = combineReducers({
  currentLetter,
  letters,
  options,
  routing: routerReducer
});

export default rootReducer;
