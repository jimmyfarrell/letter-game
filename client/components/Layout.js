import React from 'react';
import { withRouter } from 'react-router'

import Fireworks from './Fireworks';
import Letter from './Letter';
import Options from './Options';
import Score from './Score';
import Video from './Video';

class Layout extends React.Component {
  constructor(){
    super();
  }

  render() {
    const { score } = this.props;

    return (
      <div>
        <Options { ...this.props } />
        <Score { ...this.props } />
        { score < 26 && <Fireworks { ...this.props } /> }
        { score < 26 && <Letter { ...this.props } /> }
        { score === 26 && <Video { ...this.props } /> }
      </div>
    );
  }
}

export default withRouter(Layout);
