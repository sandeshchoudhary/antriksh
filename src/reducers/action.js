import moduleApi from '../api';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from './actionType';

export const updateUserDetails = data => dispatch => {
  window.localStorage.setItem('userData', data);
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};
