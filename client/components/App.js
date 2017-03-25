import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'underscore';

import * as actionCreators from '../actions';
import Main from './Main';

function mapStateToProps(state) {
  const props = [
    'currentLetter',
    'letters',
    'options',
  ];
  return pick(state, ...props);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
