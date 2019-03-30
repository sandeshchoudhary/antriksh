import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR
} from './actionType';

const INITIAL_STATE = {};

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
      return Object.assign({}, state, {
        userData: payload,
        isLoggedIn: true
      });

    case FETCH_BOOKS_PENDING:
      return Object.assign({}, state, {
        booksLoading: true
      });

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        ...{ booksLoading: false, booksList: payload.data.docs }
      };

    case FETCH_BOOKS_ERROR:
      return { ...state, ...{ booksLoading: false, booksError: true } };

    default:
      return state;
  }
};

export default reducer;
