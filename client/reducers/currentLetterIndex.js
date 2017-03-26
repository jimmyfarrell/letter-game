function currentLetterIndex(state = 0, action) {
  switch(action.type) {
    case 'CHANGE_LETTER':
      return state + 1;
    case 'CHANGE_SORT_BY':
    case 'START_OVER':
      return 0;
    default:
      return state;
  };
}

export default currentLetterIndex;
