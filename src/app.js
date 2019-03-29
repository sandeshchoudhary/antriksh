import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserDetails } from './reducers/action';
import Login from './Login';
import Library from './Library';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn && <Library />}
        {!isLoggedIn && <Login />}
      </div>
    );
  }
}

/**
 *
 * Map store props to component props
 */
const mapStateToProps = ({ moduleStore = {} }) => ({
  loging: moduleStore.loging,
  isLoggedIn: moduleStore.isLoggedIn
});

export default connect(mapStateToProps, {
  updateUserDetails
})(App);
