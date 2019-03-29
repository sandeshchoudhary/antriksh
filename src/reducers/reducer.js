import { LOGIN_PENDING, LOGIN_SUCCESS } from './actionType';

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_PENDING:
      return Object.assign({}, state, {
        loging: true
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userData: payload,
        isLoggedIn: true
      });

    default:
      return state;
  }
};

export default reducer;
