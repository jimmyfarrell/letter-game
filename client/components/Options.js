import React from 'react';
import Toggle from 'react-toggle';
import { extend } from 'underscore';

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
    const divStyle = { float: 'left' };
    const labelStyle = { height: '100%' };
    const textStyle = {
      display: 'block',
      verticalAlign: 'middle',
      marginBottom: '10px'
    };

    return (
      <div style={ divStyle }>
        <label style={ labelStyle }>
          <span style={ textStyle }>Shuffle Letters</span>
          <Toggle
            defaultChecked={ sortBy === 'shuffle' }
            onChange={ this._handleSortToggle }
          />
        </label>
        <label style={ extend({ display: 'none' }, labelStyle) }>
          <Toggle
            defaultChecked={ letterCase === 'lowercase' }
            onChange={ this._handleCaseToggle }
          />
          <span style={ textStyle }>Lowercase</span>
        </label>
        <label style={ extend({ display: 'none' }, labelStyle) }>
          <Toggle
            defaultChecked={ letterStyle === 'wacky' }
            onChange={ this._handleLetterStyleToggle }
          />
          <span style={ textStyle }>Letter Style</span>
        </label>
        <label style={ extend({ display: 'none' }, labelStyle) }>
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
