import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../reducers/action';
import { Button, Container, Row, Navbar } from 'react-bootstrap';
import axios from 'axios';

class DetailView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Container fluid>
        detail view
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
});

export default connect(mapStateToProps, {
})(DetailView);
