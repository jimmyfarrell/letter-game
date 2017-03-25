function letterCase(state = '', action) {
  if (action.type === 'CHANGE_CASE') {
    return action.letterCase;
  } else {
    return state;
  }
}

export default letterCase;
