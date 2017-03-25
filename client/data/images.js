import { each } from 'underscore';

import letters from './letters';

const letterImages = {};

each(letters.uppercase, (letter) => {
  letterImages[letter] = {
    uppercase: {
      normal: `https://s3.amazonaws.com/letter-game/images/letters/uppercase/normal/${letter.toLowerCase()}.png`
    }
  };
});

export { letterImages };
