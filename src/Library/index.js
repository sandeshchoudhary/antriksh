import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { history } from '../store';
import { logoutUser } from '../reducers/action';
import Loadable from 'react-loadable';

const Loading = () => {
  return (
    <Container
      fluid
      style={{ height: '75vh' }}
      className="bg-light d-flex justify-content-center align-items-center"
    >
      <Spinner
        animation="border"
        role="status"
        style={{ height: '48px', width: '48px' }}
      />
    </Container>
  );
};

const SearchPanel = Loadable({
  loader: () => import('./SearchPanel'),
  loading: Loading
});

const DetailView = Loadable({
  loader: () => import('./DetailView'),
  loading: Loading
});

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
        <Navbar.Brand href="/">{' Antriksh '}</Navbar.Brand>
        <div className="d-flex justify-content-end" style={{ flex: '1' }}>
          <NavDropdown
            title={userData && userData.profileObj.name}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => this.logout()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
    );
  };

  render() {
    const { userData = {} } = this.props;
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
