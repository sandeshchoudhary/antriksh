import { searchBook } from '../api';
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR
} from './actionType';

export const updateUserDetails = data => dispatch => {
  window.localStorage.setItem('userData', data);
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};

export const searchBooks = (params, type) => dispatch => {
  dispatch({
    type: FETCH_BOOKS_PENDING
  });

  searchBook(params, type)
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: {
          data: data,
          type: type
        }
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BOOKS_ERROR,
        payload: err
      });
    });
};
