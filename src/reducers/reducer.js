import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  LOGOUT_SUCCESS,
  FETCH_BOOK_DETAIL_PENDING,
  FETCH_BOOK_DETAIL_SUCCESS,
  FETCH_BOOK_DETAIL_ERROR
} from './actionType';

const INITIAL_STATE = {
  bookDetail: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_PENDING:
      return {
        ...state,
        ...{
          loging: true
        }
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          userData: payload,
          isLoggedIn: true
        }
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...{
          userData: null,
          isLoggedIn: false,
          booksList: [],
          bookDetail: null
        }
      };

    case FETCH_BOOKS_PENDING:
      return { ...state, ...{ booksLoading: true } };

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        ...{ booksLoading: false, booksList: payload.data, searched: true }
      };

    case FETCH_BOOKS_ERROR:
      return { ...state, ...{ booksLoading: false, booksError: true } };

    case FETCH_BOOK_DETAIL_PENDING:
      return { ...state, ...{ bookDetailLoading: true } };

    case FETCH_BOOK_DETAIL_SUCCESS:
      let newState = {
        ...state,
        ...{
          bookDetailLoading: false,
          bookDetailError: false,
          bookDetail: payload.data
        }
      };
      return { ...state, ...newState };

    case FETCH_BOOK_DETAIL_ERROR:
      return { ...state, ...{ bookDetailError: true } };

    default:
      return state;
  }
};

export default reducer;
