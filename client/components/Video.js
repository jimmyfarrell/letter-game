import React from 'react';
import Modal from 'react-modal';
import { sample } from 'underscore';

import videos from '../data/videos';

const Video = React.createClass({
  _showVideo: true,

  _closeVideo() {
    const { startOver } = this.props;
    this._showVideo = false;
    startOver();
  },

  render() {
    const videoURL = sample(videos);
    const xStyle = {
      cursor: 'pointer',
      position: 'relative',
      top: -23,
      left: -16
    };
    const iframeStyle = {
      height: '100%',
      width: '100%',
      margin: 'auto',
      position: 'relative',
      top: -23
    };

    return (
      <Modal
        isOpen={ this._showVideo }
        contentLabel="Video">
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={ this._closeVideo }
          style={ xStyle }></i>
        <iframe
          style={ iframeStyle }
          src={ `${videoURL}?autoplay=1` }
          frameBorder="0"
          allowFullScreen></iframe>
      </Modal>
    );
  }
});

export default Video;
