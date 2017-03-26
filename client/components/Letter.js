import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { contains, range, sample } from 'underscore';

import { letterImages } from '../data/images';
import { letterSounds, gameSounds } from '../data/sounds';

const Letter = React.createClass({
  _audios: {
    letter: null,
    correct: null,
    incorrect: null
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
    const { hideFireworks } = this.props;

    const correctAudio = this._updateAudio('correct');
    correctAudio.addEventListener('ended', function() {
      hideFireworks();
      this._showNextLetter();
    }.bind(this));

    const incorrectAudio = this._updateAudio('incorrect');
    incorrectAudio.addEventListener('ended', function() {
      this._audios.letter.play();
    }.bind(this));

  },

  _handleKeydown(e) {
    const keyCodes = range(48, 91).concat(range(186, 193), range(219, 223));
    if (!contains(keyCodes, e.keyCode)) return;

    const { currentLetterIndex, letters } = this.props;
    const { showFireworks } = this.props;
    const currentLetter = letters[currentLetterIndex].toLowerCase();
    const letterPressed = String.fromCharCode(e.keyCode).toLowerCase();

    if (currentLetter === letterPressed) {
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

  _showNextLetter() {
    const { currentLetterIndex, letters } = this.props;
    const { changeLetter, incrementScore, winGame } = this.props;

    if (currentLetterIndex + 1 === letters.length) {
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
    letterAudio.play();
  },

  shouldComponentUpdate(nextProps) {
    const { currentLetterIndex, letters } = this.props;
    const {
      currentLetterIndex: nextCurrentLetterIndex,
      letters: nextLetters
    } = nextProps;
    return letters[currentLetterIndex] !== nextLetters[nextCurrentLetterIndex];
  },

  componentDidUpdate() {
    const letterAudio = this._updateAudio('letter');
    letterAudio.play();
    this._updateGameSounds();
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
