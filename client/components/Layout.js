import React from 'react';
import { withRouter } from 'react-router'
import { push } from 'react-router-redux';

import Letter from './Letter';
import Options from './Options';

class Layout extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <Options { ...this.props } />
        <Letter { ...this.props } />
      </div>
    );
  }
}

export default withRouter(Layout);
