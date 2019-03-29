import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../reducers/action';
import { Button, Container, Row, Navbar } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DetailView from './DetailView';
import SearchPanel from './SearchPanel';

class Library extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Container fluid style={{padding: '0px'}}>
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
        </Navbar>
        <Switch>
          <Route
            path="/library/overview"
            render={props => <DetailView {...props} />}
          />
          <Route
            path="/"
            render={props => <SearchPanel {...props} />}
          />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
});

export default connect(mapStateToProps, {
})(Library);
