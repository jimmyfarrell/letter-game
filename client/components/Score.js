import React from 'react';

const Score = React.createClass({
  render() {
    const { score } = this.props;
    const scoreStyle = {
      position: 'fixed',
      top: '15px',
      right: '30px',
      fontSize: '30px'
    };

    return (
      <div className="score" style={ scoreStyle }>
        Score: { score }
      </div>
    );
  }
});

export default Score;
