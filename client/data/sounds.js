import { each } from 'underscore';

import letters from './letters';

const gameSounds = {
  tryAgain: 'https://s3.amazonaws.com/letter-game/audio/game/try-again.wav',
  win: 'https://s3.amazonaws.com/letter-game/audio/game/nice-job.wav'
};

const letterSounds = {};

each(letters.lowercase, (letter) => {
  letterSounds[letter] = {
    name: `https://s3.amazonaws.com/letter-game/audio/letters/name/${letter}.mp3`,
    makes: ''
  };
});

export { letterSounds, gameSounds };
