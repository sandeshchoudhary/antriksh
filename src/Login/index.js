import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateUserDetails,
  updateLoginError,
  loginProcess
} from '../reducers/action';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { history } from '../store';
import config from '../../config';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Redirect to login page if user is not logged in
    if (this.props.isLoggedIn) {
      history.push('/library');
    }
  }

  /**
   * Save user details
   */
  responseGoogleSuccess = response => {
    this.props.updateUserDetails(response);
    history.push('/library');
  };

  responseGoogleError = err => {
    this.props.updateLoginError(err);
  };

  loginWithGoogle = (event, loginCallback) => {
    this.props.loginProcess();
    loginCallback(event);
  };

  render() {
    const { loging, loginError, loginErrorMessage } = this.props;
    return (
      <Container fluid>
        <Row style={{ height: '100vh' }}>
          <Col md={6} className="bg-dark text-light">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <h2>
                Antrakish<br />Explore the world here
              </h2>
            </div>
          </Col>
          <Col md={6} className="bg-light">
            <div className="h-100 d-flex justify-content-center align-items-center flex-column">
              <GoogleLogin
                clientId={config.clientId}
                render={renderProps => (
                  <Button
                    onClick={ev =>
                      this.loginWithGoogle(ev, renderProps.onClick)
                    }
                    variant="primary"
                    disabled={loging}
                  >
                    Login with Google
                  </Button>
                )}
                onSuccess={this.responseGoogleSuccess}
                onFailure={this.responseGoogleError}
              />
              {/* {loginError && ( */}
              <p className="text-danger m-4">{loginErrorMessage}</p>
              {/* )} */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ moduleStore = {} }) => ({
  loging: moduleStore.loging,
  isLoggedIn: moduleStore.isLoggedIn,
  loginError: moduleStore.loginError,
  loginErrorMessage: moduleStore.loginErrorMessage
});

export default connect(mapStateToProps, {
  updateUserDetails,
  updateLoginError,
  loginProcess
})(Login);
