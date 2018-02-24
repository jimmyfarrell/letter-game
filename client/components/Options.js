import React from 'react';
import Modal from 'react-modal';
import Toggle from 'react-toggle';
import { extend } from 'underscore';

const Options = React.createClass({
  _closeOptionsPanel() {
    const { toggleOptions } = this.props;
    toggleOptions();
    this._handleSortToggle(this.refs.sort.state.checked);
  },

  _handleSortToggle(checked) {
    const { options: { sortBy }, changeSortBy } = this.props;
    const newSortBy = checked ? 'shuffle' : 'alphabetical';
    if (newSortBy === sortBy) return;
    changeSortBy(newSortBy);
  },

  _handleCaseToggle(e) {
  },

  _handleLetterStyleToggle(e) {
  },

  _handleSoundStyleToggle(e) {
  },

  render() {
    const {
      letterCase,
      letterStyle,
      showOptions,
      sortBy,
      soundStyle
    } = this.props.options;
    const { toggleOptions } = this.props;
    const cogStyle = {
      marginLeft: '15px',
      position: 'fixed',
      top: '15px',
      cursor: 'pointer'
    };
    const xStyle = {
      cursor: 'pointer',
      position: 'relative',
      top: -32,
      left: -25
    };
    const divStyle = { padding: '10px' };
    const labelStyle = { height: '100%' };
    const textStyle = {
      display: 'block',
      verticalAlign: 'middle',
      marginBottom: '10px',
      marginTop: '10px'
    };
    const modalStyle = {
      content: {
        width: '200px',
        height: '200px'
      }
    };
    const modalTitleStyle = {
      marginTop: '-30px'
    }

    return (
      <div>
        <i
          className="fa fa-cog fa-3x"
          aria-hidden="true"
          onClick={ toggleOptions }
          style= { cogStyle }></i>
        <Modal
          isOpen={ showOptions }
          contentLabel="Options"
          style={ modalStyle }>
          <div style={ divStyle }>
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={ this._closeOptionsPanel }
              style={ xStyle }></i>
            <h2 style={ modalTitleStyle }>Options</h2>
            <label style={ labelStyle }>
              <span style={ textStyle }>Shuffle Letters</span>
              <Toggle
                defaultChecked={ sortBy === 'shuffle' }
                ref="sort"/>
            </label>
            <label style={ extend({ display: 'none' }, labelStyle) }>
              <Toggle
                defaultChecked={ letterCase === 'lowercase' }
                onChange={ this._handleCaseToggle } />
              <span style={ textStyle }>Lowercase</span>
            </label>
            <label style={ extend({ display: 'none' }, labelStyle) }>
              <Toggle
                defaultChecked={ letterStyle === 'wacky' }
                onChange={ this._handleLetterStyleToggle } />
              <span style={ textStyle }>Letter Style</span>
            </label>
            <label style={ extend({ display: 'none' }, labelStyle) }>
              <Toggle
                defaultChecked={ soundStyle === 'makes' }
                onChange={ this._handleSoundStyleToggle } />
              <span style={ textStyle }>Sound Style</span>
            </label>
          </div>
          <p>Press CTRL + letter to skip to that letter.</p>
        </Modal>
      </div>
    );
  }
});

export default Options;
