import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { store, history } from './store';
import App from './app';
// import DetailView from './DetailView';
// import Library from './Library';
import Login from './Login';
import Library from './Library';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/library"
              render={props => <Library {...props} />}
            />
            <Route
              exact
              path="/"
              render={props => <Login {...props} />}
            />
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