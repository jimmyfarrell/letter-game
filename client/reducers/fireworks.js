function fireworks(state = false, action) {
  if (action.type === 'SHOW_FIREWORKS') {
    return true;
  } else if (action.type === 'HIDE_FIREWORKS') {
    return false;
  } else {
    return state;
  }
}

export default fireworks;
