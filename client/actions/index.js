export function nextLetter(letter) {
  return {
    type: 'NEXT_LETTER',
    letter
  };
};

export function sortLettersBy(sortBy, letterCase) {
  return {
    type: 'SORT_LETTERS_BY',
    sortBy,
    letterCase
  };
};

export function changeCase(letterCase) {
  return {
    type: 'CHANGE_CASE',
    letterCase
  };
};

export function changeLetterStyle(letterStyle) {
  return {
    type: 'CHANGE_LETTER_STYLE',
    letterStyle
  };
};

export function changeSoundStyle(soundStyle) {
  return {
    type: 'CHANGE_SOUND_STYLE',
    soundStyle
  };
};
