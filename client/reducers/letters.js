import { isEqual, shuffle } from 'underscore';

import lettersData from '../data/letters';

function letters(state = [], action) {
  const letterCase =
    state[0] && state[0] === state[0].toLowerCase() ? 'lowercase' : 'uppercase';
  const sortedLetters = lettersData[letterCase];

  switch (action.type) {
    case 'CHANGE_SORT_BY':
      return action.sortBy === 'shuffle' ? shuffle(sortedLetters) : sortedLetters;
    case 'START_OVER':
      const isSorted = isEqual(state, sortedLetters);
      return isSorted ? state : shuffle(sortedLetters);
    default:
      return state;
  }
}

export default letters;
