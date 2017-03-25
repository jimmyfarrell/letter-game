import React from 'react';
import { indexOf } from 'underscore';

import { letterImages } from '../data/images';
import { letterSounds, gameSounds } from '../data/sounds';

const Letter = React.createClass({
  _audios: {
    letter: null,
    tryAgain: null,
    win: null
  },

  _generateAudio(type, audioURL) {
    this._audios[type] = new Audio(audioURL);
    return this._audios[type];
  },

  _handleKeydown(e) {
    const { currentLetter } = this.props;

    if (e.key.toLowerCase() === currentLetter.toLowerCase()) {
      this._audios.win.play();
    } else {
      if (this._audios.tryAgain.paused) {
        this._audios.tryAgain.play();
      }
    }
  },

  _showNextLetter(props) {
    const { currentLetter, letters } = props;
    const { nextLetter, sortLettersBy } = props;
    const newIndex = indexOf(letters, currentLetter) + 1;

    if (newIndex === letters.length) {
      if (sortBy === 'shuffle') {
        sortLettersBy(sortBy);
      } else {
        nextLetter(letters[0]);
      }
    } else {
      nextLetter(letters[newIndex]);
    }

  },

  componentWillMount() {
    this._generateAudio('tryAgain', gameSounds.tryAgain);
    this._audios.tryAgain.addEventListener('ended', function() {
      this._audios.letter.play();
    }.bind(this));

    this._generateAudio('win', gameSounds.win);
    this._audios.win.addEventListener('ended', function() {
      this._showNextLetter(this.props);
    }.bind(this));

    document.addEventListener('keydown', this._handleKeydown);
  },

  componentDidMount() {
    const { currentLetter, soundStyle } = this.props;
    const audioURL = letterSounds[currentLetter.toLowerCase()][soundStyle];
    const letterAudio = this._generateAudio('letter', audioURL);
    letterAudio.play();
  },

  componentWillReceiveProps(nextProps) {
    const { currentLetter, letters, sortBy, soundStyle } = this.props;
    const { nextLetter } = this.props;
    const {
      currentLetter: nextCurrentLetter,
      letters: nextLetters,
      sortBy: nextSortBy
    } = nextProps;

    if (letters !== nextLetters) {
      this.props.nextLetter(nextLetters[0]);
    } else if (currentLetter !== nextCurrentLetter) {
      const audioURL = letterSounds[nextCurrentLetter.toLowerCase()][soundStyle];
      const letterAudio = this._generateAudio('letter', audioURL);
      letterAudio.play();
    }
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeydown);
  },

  render() {
    const { currentLetter, letterCase, letterStyle } = this.props;
    const textStyle = {
      textAlign: 'center'
    };
    const characterStyle = {
      fontWeight: 'bold'
    };
    const imgStyle = {
      display: 'block',
      margin: 'auto'
    };

    return (
      <div className="letter">
        <figure className="letter-image">
          <h2 style={ textStyle }>
            Press the
            <span style={ characterStyle }> "{ currentLetter }" </span>
            key on the keyboard.
          </h2>
          <div className="letter-image-wrapper">
            <img
              src={ letterImages[currentLetter][letterCase][letterStyle] }
              style={ imgStyle } />
          </div>
        </figure>
      </div>
    );
  }
});

export default Letter;
