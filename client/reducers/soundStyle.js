function soundStyle(state = '', action) {
  if (action.type === 'CHANGE_SOUND_STYLE') {
    return action.soundStyle;
  } else {
    return state;
  }
}

export default soundStyle;
