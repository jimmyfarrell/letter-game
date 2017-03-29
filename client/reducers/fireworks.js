function fireworks(state = false, action) {
  switch (action.type) {
    case 'SHOW_FIREWORKS':
      return true;
    case 'HIDE_FIREWORKS':
    case 'WIN_GAME':
    case 'CHANGE_SORT_BY':
    case 'CHANGE_LETTER':
      return false;
    default:
      return state;
  }
}

export default fireworks;
