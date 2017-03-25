function letterStyle(state = '', action) {
  if (action.type === 'CHANGE_LETTER_STYLE') {
    return action.letterStyle;
  } else {
    return state;
  }
}

export default letterStyle;
