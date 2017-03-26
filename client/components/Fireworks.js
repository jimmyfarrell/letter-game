import React from 'react';

const Fireworks = React.createClass({
  render() {
    const { fireworks } = this.props;

    const divStyle = {
      backgroundImage: "url('https://s3.amazonaws.com/letter-game/images/fireworks.gif')",
      height: '300px',
      width: '300px',
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
