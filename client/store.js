import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

import letters from './data/letters';

const defaultState = {
  currentLetter: letters.uppercase[0],
  letterCase: 'uppercase',
  letterStyle: 'normal',
  letters: letters.uppercase,
  sortBy: 'alphabetical',
  soundStyle: 'name'
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
