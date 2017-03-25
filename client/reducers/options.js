function options(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_OPTIONS':
      return { ...state, showOptions: !state.showOptions }
    case 'CHANGE_LETTER_STYLE':
      return { ...state, letterStyle: action.letterStyle };
    case 'CHANGE_LETTER_CASE':
      return { ...state, letterCase: action.letterCase };
    case 'CHANGE_SORT_BY':
      return { ...state, sortBy: action.sortBy };
    case 'CHANGE_SOUND_STYLE':
      return { ...state, soundStyle: action.soundStyle };
    default:
      return state;
  }
}

export default options;
