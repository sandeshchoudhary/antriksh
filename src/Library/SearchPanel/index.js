import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../reducers/action';
import { Button, Container, Row, Navbar } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import {history} from '../../store';


class SearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid>
        search panel
        <Button onClick={() => history.push('/library/overview')} variant="primary">
          Login with Google
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
});

export default connect(mapStateToProps, {
})(SearchPanel);
