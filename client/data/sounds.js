import { each, sample } from 'underscore';

import letters from './letters';

const gameSounds = {
  ding: 'https://s3.amazonaws.com/letter-game/audio/game/ding.wav',
  incorrect: 'https://s3.amazonaws.com/letter-game/audio/game/try-again.wav',
  get correct() {
    return sample([
      'https://s3.amazonaws.com/letter-game/audio/game/applause.mp3',
      'https://s3.amazonaws.com/letter-game/audio/game/yay.wav'
    ]);
  }
};

const letterSounds = {};

each(letters.lowercase, (letter) => {
  letterSounds[letter] = {
    name: `https://s3.amazonaws.com/letter-game/audio/letters/name/${letter}.mp3`,
    makes: ''
  };
});

export { letterSounds, gameSounds };
