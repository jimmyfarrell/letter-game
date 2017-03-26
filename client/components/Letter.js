import React from 'react';
import { indexOf, sample } from 'underscore';

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
    const { currentLetterIndex, letters } = this.props;
    const { incrementScore } = this.props;

    if (e.key.toLowerCase() === letters[currentLetterIndex].toLowerCase()) {
      incrementScore();
      this._audios.win.play();
    } else {
      if (this._audios.tryAgain.paused) {
        this._audios.tryAgain.play();
      }
    }
  },

  _showNextLetter(props) {
    const { currentLetterIndex, letters } = props;
    const { changeLetter } = props;

    if (currentLetterIndex + 1 === letters.length) {
      // WINNING!
    } else {
      changeLetter();
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
    const { currentLetterIndex, letters, options } = this.props;
    const { soundStyle } = options;
    const currentLetter = letters[currentLetterIndex];
    const audioURL = letterSounds[currentLetter.toLowerCase()][soundStyle];
    const letterAudio = this._generateAudio('letter', audioURL);
    letterAudio.play();
  },

  componentWillReceiveProps(nextProps) {
    const { currentLetterIndex, letters, options } = this.props;
    const { showOptions, sortBy, soundStyle } = options;
    const { changeLetter } = this.props;
    const {
      currentLetterIndex: nextCurrentLetterIndex,
      letters: nextLetters,
      options: { nextShowOptions }
    } = nextProps;
    const currentLetter = letters[currentLetterIndex];
    const nextCurrentLetter = nextLetters[nextCurrentLetterIndex];

    if (currentLetter !== nextCurrentLetter) {
      const audioURL = letterSounds[nextCurrentLetter.toLowerCase()][soundStyle];
      const letterAudio = this._generateAudio('letter', audioURL);
      letterAudio.play();
    }
  },

  shouldComponentUpdate(nextProps) {
    const { currentLetterIndex, letters } = this.props;
    const {
      currentLetterIndex: nextCurrentLetterIndex,
      letters: nextLetters
    } = nextProps;
    return letters[currentLetterIndex] !== nextLetters[nextCurrentLetterIndex];
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeydown);
  },

  render() {
    const { currentLetterIndex, letters, options } = this.props;
    const { letterStyle, letterCase } = options;
    const currentLetter = letters[currentLetterIndex];
    const letterColorOptions =
      ['#c61516', '#75517c', '#7ab929', '#204987', '#c4a003', '#5d3566',
       '#3466a5', '#f8ae3e', '#a51916', '#8fc035', '#ce5d15', '#8f5a14',
       '#e63423', '#fbe050', '#739fd0', '#ef790e', '#ac7ea7', '#4d9c34'];
    const letterColor = sample(letterColorOptions);
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
    const blockBorderStyle = {
      margin: 'auto',
      height: '400px',
      width: '400px',
      borderStyle: 'solid',
      borderColor: letterColor,
      borderWidth: '40px',
      borderRadius: '70px'
    };
    const letterWrapperStyle = {
      fontFamily: 'Times New Roman, Times, serif',
      fontSize: '350px',
      color: letterColor,
      height: '100%',
      width: '100%',
      margin: 'auto',
      textAlign: 'center',
      lineHeight: '400px'
    };

    return (
      <div className="letter" key={ 0 }>
        <figure className="letter-image">
          <h2 style={ textStyle }>
            Press the
            <span style={ characterStyle }> "{ currentLetter }" </span>
            key on the keyboard.
          </h2>
          <div className="letter-image-wrapper">
            <div className="block-border" style={ blockBorderStyle }>
              <div className="letter-wrapper" style= { letterWrapperStyle }>
                { currentLetter }
              </div>
            </div>
          </div>
        </figure>
      </div>
    );
  }
});

export default Letter;
