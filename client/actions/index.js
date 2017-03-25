export function nextLetter(letter) {
  return {
    type: 'NEXT_LETTER',
    letter
  };
}

export function sortLettersBy(sortBy) {
  return {
    type: 'SORT_LETTERS_BY',
    sortBy: sortBy
  };
}
