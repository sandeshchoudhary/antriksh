import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../reducers/action';
import { Button, Container, Row, Navbar, NavDropdown } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DetailView from './DetailView';
import SearchPanel from './SearchPanel';
import {history} from '../store';
import {logoutUser} from '../reducers/action';

class Library extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {}

  logout = () => {
    this.props.logoutUser()
    history.push('/')
  }

  render() {
    const {userData} = this.props;
    return (
      <Container fluid style={{ padding: '0px' }}>
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
          {userData && (
            <NavDropdown title={userData.profileObj.name} id="basic-nav-dropdown"
              >
              <NavDropdown.Item onClick={() => this.logout()}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar>
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
