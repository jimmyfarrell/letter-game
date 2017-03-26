import React from 'react';

import { miscImages } from '../data/images';

const Fireworks = React.createClass({
  render() {
    const { fireworks } = this.props;

    const divStyle = {
      backgroundImage: `url(${miscImages.fireworks})`,
      height: '600px',
      width: '600px',
      position: 'absolute',
      zIndex: 1000,
      margin: 'auto',
      left: 0,
      right: 0
    };

    return (
      <div>
      { fireworks && <div style={ divStyle }></div> }
      </div>
    );
  }
});

export default Fireworks;
