function currentLetter(state = null, action) {
  switch(action.type) {
    case 'NEXT_LETTER':
      return action.letter;
    default:
      return state;
  };
}

export default currentLetter;
