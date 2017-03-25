function sortBy(state = '', action) {
  if (action.type === 'SORT_LETTERS_BY') {
    return action.sortBy;
  } else {
    return state;
  }
}

export default sortBy;
