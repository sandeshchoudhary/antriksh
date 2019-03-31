import reducer from '../reducer';
import * as types from '../actionType';
import { INITIAL_STATE } from '../initialState';

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle LOGIN_PENDING', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOGIN_PENDING
        }
      )
    ).toEqual({
      loging: true
    });
  });
});
