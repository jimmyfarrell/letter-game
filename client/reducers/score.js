function score(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      return state + 1;
    case 'CHANGE_SORT_BY':
      return 0;
    default:
      return state;
  }
}

export default score;
