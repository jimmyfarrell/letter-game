function currentLetterIndex(state = 0, action) {
  switch(action.type) {
    case 'CHANGE_LETTER':
      if (action.letterIndex) {
        return action.letterIndex;
      } else if (state === 25) {
        return 0;
      } else {
        return state + 1;
      }
    case 'CHANGE_SORT_BY':
    case 'START_OVER':
      return 0;
    default:
      return state;
  };
}

export default currentLetterIndex;
