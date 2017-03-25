import React from 'react';
import { withRouter } from 'react-router'
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    const titleStyle = {
      textAlign: 'center'
    };

    return (
      <div>
        <h1 style ={ titleStyle }>Can You Find The Letters?</h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default withRouter(Main);
