import React from 'react';
import Toggle from 'react-toggle';

const Options = React.createClass({

  _handleSortToggle(e) {
    const { letterCase, sortLettersBy } = this.props;
    sortLettersBy(
      e.currentTarget.checked ? 'shuffle' : 'alphabetical',
      letterCase
    );
  },

  _handleCaseToggle(e) {
  },

  _handleLetterStyleToggle(e) {
  },

  _handleSoundStyleToggle(e) {
  },

  render() {
    const { letterCase, letterStyle, sortBy, soundStyle } = this.props;
    const divStyle = { float: 'right' };
    const labelStyle = {
      height: '100%'
    };
    const textStyle = {
      verticalAlign: 'middle'
    };

    return (
      <div style={ divStyle }>
        <label style={ labelStyle }>
          <Toggle
            defaultChecked={ sortBy === 'shuffle' }
            onChange={ this._handleSortToggle }
          />
          <span style={ textStyle }>Shuffle</span>
        </label>
        <label style={ labelStyle }>
          <Toggle
            defaultChecked={ letterCase === 'lowercase' }
            onChange={ this._handleCaseToggle }
          />
          <span style={ textStyle }>Lowercase</span>
        </label>
        <label style={ labelStyle }>
          <Toggle
            defaultChecked={ letterStyle === 'wacky' }
            onChange={ this._handleLetterStyleToggle }
          />
          <span style={ textStyle }>Letter Style</span>
        </label>
        <label style={ labelStyle }>
          <Toggle
            defaultChecked={ soundStyle === 'makes' }
            onChange={ this._handleSoundStyleToggle }
          />
          <span style={ textStyle }>Sound Style</span>
        </label>
      </div>
    );
  }
});

export default Options;
