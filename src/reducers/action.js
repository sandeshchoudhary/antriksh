import { searchBook, getBookInfo } from '../api';
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  LOGOUT_SUCCESS,
  FETCH_BOOK_DETAIL_PENDING,
  FETCH_BOOK_DETAIL_SUCCESS,
  FETCH_BOOK_DETAIL_ERROR
} from './actionType';

export const loginProcess = () => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });
};

export const updateUserDetails = data => dispatch => {
  window.localStorage.setItem('userData', JSON.stringify(data));
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};

export const updateLoginError = data => dispatch => {
  dispatch({
    type: LOGIN_ERROR,
    payload: data
  });
};

export const logoutUser = () => dispatch => {
  window.localStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS
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
          data: type === 'bname' ? data.docs : [data[params.bibkeys]],
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

export const getBookDetail = (params, isbn) => dispatch => {
  dispatch({
    type: FETCH_BOOK_DETAIL_PENDING
  });

  getBookInfo(params)
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOOK_DETAIL_SUCCESS,
        payload: {
          data: data[params.bibkeys],
          isbn: isbn
        }
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BOOK_DETAIL_ERROR,
        payload: err
      });
    });
};
