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
    const { currentLetter, letters, options: { sortBy, letterCase } } = props;
    const { changeLetter, changeSortBy } = props;
    const newIndex = indexOf(letters, currentLetter) + 1;

    if (newIndex === letters.length) {
      if (sortBy === 'shuffle') {
        changeSortBy(sortBy, letterCase);
      } else {
        changeLetter(letters[0]);
      }
    } else {
      changeLetter(letters[newIndex]);
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
    const { currentLetter, options } = this.props;
    const { soundStyle } = options;
    const audioURL = letterSounds[currentLetter.toLowerCase()][soundStyle];
    const letterAudio = this._generateAudio('letter', audioURL);
    letterAudio.play();
  },

  componentWillReceiveProps(nextProps) {
    const { currentLetter, letters, options } = this.props;
    const { showOptions, sortBy, soundStyle } = options;
    const { changeLetter } = this.props;
    const {
      currentLetter: nextCurrentLetter,
      letters: nextLetters,
      options: { nextShowOptions }
    } = nextProps;

    if (letters !== nextLetters) {
      changeLetter(nextLetters[0]);
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
    const { currentLetter, options } = this.props;
    const { letterStyle, letterCase } = options;
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
