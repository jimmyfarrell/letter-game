import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { contains, findIndex, range, sample } from 'underscore';

import { letterImages } from '../data/images';
import { letterSounds, gameSounds } from '../data/sounds';

const Letter = React.createClass({
  _audios: {
    letter: null,
    correct: null,
    incorrect: null,
    transition: null
  },

  _generateAudio(type, audioURL) {
    this._audios[type] = new Audio(audioURL);
    return this._audios[type];
  },

  _updateAudio(type) {
    let audioURL;

    if (type === 'letter') {
      const { currentLetterIndex, letters, options } = this.props;
      const { soundStyle } = options;
      const currentLetter = letters[currentLetterIndex];
      audioURL = letterSounds[currentLetter.toLowerCase()][soundStyle];
    } else if (type.includes('correct')) {
      audioURL = gameSounds[type];
    }

    return this._generateAudio(type, audioURL);
  },

  _updateGameSounds() {
    const transitionAudio = this._generateAudio('transition', gameSounds.ding);
    transitionAudio.addEventListener('ended', this._playLetterSound);

    const correctAudio = this._updateAudio('correct');
    correctAudio.addEventListener('ended', this._showNextLetter);

    const incorrectAudio = this._updateAudio('incorrect');
    incorrectAudio.addEventListener('ended', this._playLetterSound);
  },

  _removeAudioEventListeners() {
    this._audios.transition.removeEventListener('ended', this._playLetterSound);
    this._audios.correct.removeEventListener('ended', this._showNextLetter);
    this._audios.incorrect.removeEventListener('ended', this._playLetterSound);
  },

  _pauseAllAudios() {
    this._audios.transition.pause();
    this._audios.correct.pause();
    this._audios.incorrect.pause();
    this._audios.letter.pause();
  },

  _handleKeydown(e) {
    const keyCodes = range(48, 91).concat(range(186, 193), range(219, 223), 8);
    if (!contains(keyCodes, e.keyCode)) return;

    const { currentLetterIndex, letters } = this.props;
    const { changeLetter, showFireworks, winGame } = this.props;
    const currentLetter = letters[currentLetterIndex].toLowerCase();
    const letterPressed = String.fromCharCode(e.keyCode).toLowerCase();

    if (e.ctrlKey && e.keyCode === 8) {
      winGame();
    } else if (e.ctrlKey && contains(range(48, 91), e.keyCode)) {
      const newLetterIndex = findIndex(letters, (letter) => {
        return letter.toLowerCase() === String.fromCharCode(e.keyCode).toLowerCase();
      });
      changeLetter(newLetterIndex);
    } else if (currentLetter === letterPressed) {
      this._audios.incorrect.pause();
      this._generateAudio('incorrect', '');
      showFireworks();
      this._audios.correct.play();
    } else {
      if (this._audios.incorrect.paused) {
        this._audios.incorrect.play();
      }
    }
  },

  _playLetterSound() {
    this._audios.letter.play();
  },

  _showNextLetter() {
    const { currentLetterIndex, letters, score } = this.props;
    const { changeLetter, hideFireworks, incrementScore, winGame } = this.props;

    hideFireworks();

    if (score + 1 === letters.length) {
      winGame();
    } else {
      changeLetter();
      incrementScore();
    }
  },

  componentWillMount() {
    this._updateGameSounds();
    document.addEventListener('keydown', this._handleKeydown);
  },

  componentDidMount() {
    const letterAudio = this._updateAudio('letter');
    this._audios.transition.play();
  },

  shouldComponentUpdate(nextProps) {
    const { currentLetterIndex, letters } = this.props;
    const {
      currentLetterIndex: nextCurrentLetterIndex,
      letters: nextLetters
    } = nextProps;
    return letters[currentLetterIndex] !== nextLetters[nextCurrentLetterIndex];
  },

  componentWillUpdate() {
    this._pauseAllAudios();
    this._removeAudioEventListeners();
  },

  componentDidUpdate() {
    this._updateAudio('letter');
    this._updateGameSounds();
    this._audios.transition.play();
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeydown);
    this._pauseAllAudios();
    this._removeAudioEventListeners();
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
      borderRadius: '70px',
      backgroundColor: '#fff'
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
      <ReactCSSTransitionGroup
        key={ currentLetter }
        transitionName="letter"
        transitionAppear={ true }
        transitionAppearTimeout={ 1000 }
        transitionEnterTimeout={ 1000 }
        transitionLeaveTimeout={ 1000 }>
        <div className="letter" key={ currentLetter } ref="letter">
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
      </ReactCSSTransitionGroup>
    );
  }
});

export default Letter;
