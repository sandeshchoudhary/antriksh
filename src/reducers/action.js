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

/**
 * Initiate login process
 */
export const loginProcess = () => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });
};

/**
 * Save user data
 * @param {Object} data user data
 */
export const updateUserDetails = data => dispatch => {
  window.localStorage.setItem('userData', JSON.stringify(data));
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};

/**
 * Save login error
 * @param {Object} err error
 */
export const updateLoginError = err => dispatch => {
  console.log(err);
  dispatch({
    type: LOGIN_ERROR,
    payload: 'Not able to login. Please try again'
  });
};

/**
 * Logout user
 */
export const logoutUser = () => dispatch => {
  window.localStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

/**
 * Search books
 * @param {Object} params search filter params
 * @param {String} type search type
 */
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
      console.log(err);
      dispatch({
        type: FETCH_BOOKS_ERROR,
        payload: 'Not able to search books'
      });
    });
};

/**
 * Get book detail
 * @param {Object} params search filter params
 * @param {String} isbn book isbn code
 */
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
      console.log(err);
      dispatch({
        type: FETCH_BOOK_DETAIL_ERROR,
        payload: 'Not able to fetch book detail'
      });
    });
};
