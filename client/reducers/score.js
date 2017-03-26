function score(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      return state + 1;
    case 'CHANGE_SORT_BY':
    case 'START_OVER':
      return 0;
    case 'WIN_GAME':
      return 26;
    default:
      return state;
  }
}

export default score;
