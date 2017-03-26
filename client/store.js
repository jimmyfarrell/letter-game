import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

import letters from './data/letters';

const defaultState = {
  currentLetterIndex: 0,
  fireworks: false,
  letters: letters.uppercase,
  options: {
    letterCase: 'uppercase',
    letterStyle: 'normal',
    showOptions: false,
    sortBy: 'alphabetical',
    soundStyle: 'name'
  },
  score: 0
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
