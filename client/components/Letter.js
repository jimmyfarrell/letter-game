import React from 'react';
import { findIndex, throttle } from 'underscore';

import sounds from '../data/miscSounds';

const Letter = React.createClass({
  _audios: {
    letter: null,
    tryAgain: null
  },

  _generateAudio(type, audioURL) {
    this._audios[type] = new Audio(audioURL);
    return this._audios[type];
  },

  _handleKeydown(e) {
    const { currentLetter, letters, sortBy } = this.props;
    const { nextLetter, sortLettersBy } = this.props;

    if (e.key.toLowerCase() === currentLetter.character.toLowerCase()) {
      let newIndex = findIndex(letters, currentLetter) + 1;

      if (newIndex === letters.length) {
        newIndex = 0;

        if (sortBy === 'shuffle') {
          sortLettersBy(sortBy);
        }
      }

      nextLetter(letters[newIndex]);
    } else {
      if (this._audios.tryAgain.paused) {
        this._audios.tryAgain.play();
        this._audios.tryAgain.addEventListener('ended', function() {
          this._audios.letter.play();
        }.bind(this))
      }
    }
  },

  componentWillMount() {
    this._generateAudio('tryAgain', sounds.tryAgain);
    document.addEventListener('keydown', this._handleKeydown);
  },

  componentDidMount() {
    const { audioURL } = this.props.currentLetter;
    const letterAudio = this._generateAudio('letter', audioURL);
    letterAudio.play();
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.currentLetter === nextProps.currentLetter &&
      this.props.sortBy === nextProps.sortBy) return;
    const { audioURL } = nextProps.currentLetter;
    const letterAudio = this._generateAudio('letter', audioURL);
    letterAudio.play();
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeydown);
  },

  render() {
    const { character, imageURL } = this.props.currentLetter;

    return (
      <div className="letter">
        <figure className="letter-image">
          <figcaption>
            Find the letter { character }.
          </figcaption>
          <div className="letter-image-wrapper">
            <img src={imageURL} />
          </div>
        </figure>
      </div>
    );
  }
});

export default Letter;
