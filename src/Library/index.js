import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import DetailView from './DetailView';
import SearchPanel from './SearchPanel';
import { history } from '../store';
import { logoutUser } from '../reducers/action';

class Library extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Redirect to login page if user is not logged in
    if (!this.props.isLoggedIn) {
      history.push('/');
    }
  }

  /**
   * Handle logout
   */
  logout = () => {
    this.props.logoutUser();
    history.push('/');
  };

  /**
   * Render nav bar
   */
  renderNav = (userData = {}) => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' Antriksh '}
        </Navbar.Brand>
        <div className="d-flex justify-content-end" style={{ flex: '1' }}>
          <NavDropdown title={userData.profileObj.name} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => this.logout()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
    );
  };

  render() {
    const { userData } = this.props;
    return (
      <Container fluid style={{ padding: '0px' }}>
        {this.renderNav(userData)}
        <Switch>
          <Route
            path="/library/:id"
            render={props => <DetailView {...props} />}
          />
          <Route path="/" render={props => <SearchPanel {...props} />} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  userData: moduleStore.userData,
  isLoggedIn: moduleStore.isLoggedIn
});

export default connect(mapStateToProps, {
  logoutUser
})(Library);
