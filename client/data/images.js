import { each } from 'underscore';

import letters from './letters';

const letterImages = {};

each(letters.uppercase, (letter) => {
  letterImages[letter] = {
    uppercase: {
      normal: 'http://placehold.it/500x500'
    }
  };
});

export { letterImages };
