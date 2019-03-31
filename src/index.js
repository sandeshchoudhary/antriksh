import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import Loadable from 'react-loadable';
import { Container, Spinner } from 'react-bootstrap';

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

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
});

const Library = Loadable({
  loader: () => import('./Library'),
  loading: Loading
});

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/library" render={props => <Library {...props} />} />
            <Route path="/" render={props => <Login {...props} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
