import React from 'react';
import { withRouter } from 'react-router'
import { Link } from 'react-router';

class Main extends React.Component {
  render(){
    return (
      <div>
        <h1>Letter Game</h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
}

export default withRouter(Main);
