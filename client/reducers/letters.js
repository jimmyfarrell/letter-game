import { shuffle } from 'underscore';

import sortedLetters from '../data/letters';

function letters(state = [], action) {
  switch (action.type) {
    case 'SORT_LETTERS_BY':
      return action.sortBy === 'shuffle' ? shuffle(sortedLetters) : sortedLetters;
    default:
      return state;
  }
}

export default letters;
