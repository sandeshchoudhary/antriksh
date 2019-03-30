import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateUserDetails } from '../reducers/action';
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { history } from '../store';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      history.push('/library');
    }
  }

  /**
   * Save user details
   */
  responseGoogle = response => {
    this.props.updateUserDetails(response);
    history.push('/library');
  };

  render() {
    return (
      <Container fluid>
        <Row style={{ height: '100vh' }}>
          <Col md={6} className="bg-dark text-light">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <h2>
                Antrakish<br />Explore the world here{' '}
              </h2>
            </div>
          </Col>
          <Col md={6} className="bg-light">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <GoogleLogin
                clientId="585625168180-fhtig4btvduktuloojtloi8ctdj81270.apps.googleusercontent.com"
                render={renderProps => (
                  <Button onClick={renderProps.onClick} variant="primary">
                    Login with Google
                  </Button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  loging: moduleStore.loging,
  isLoggedIn: moduleStore.isLoggedIn
});

export default connect(mapStateToProps, {
  updateUserDetails
})(Login);
