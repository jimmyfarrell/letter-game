import React from 'react';
import { withRouter } from 'react-router'

import Letter from './Letter';
import Options from './Options';
import Score from './Score';

class Layout extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <Options { ...this.props } />
        <Score { ...this.props } />
        <Letter { ...this.props } />
      </div>
    );
  }
}

export default withRouter(Layout);
