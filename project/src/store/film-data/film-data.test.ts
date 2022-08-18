import { filmData, filmMask, initialState } from './film-data';
import { filmOne } from '../../mocks/mocks';
import {
  loadFilmById,
  isErrorResponseAction,
  clearResponseErrorAction,
} from '../actions';

describe('Reducer: filmData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      film: filmMask,
      error: false,
    });
  });

  it('should load film by id Success', () => {
    expect(
      filmData.reducer(initialState, {
        type: loadFilmById.type,
        payload: filmOne,
      })
    ).toEqual({
      film: filmOne,
      error: false,
    });
  });

  it('should load film by id Error', () => {
    expect(
      filmData.reducer(initialState, {
        type: isErrorResponseAction.type,
        payload: filmOne, //создать что-то?
      })
    ).toEqual({
      film: filmMask,
      error: true,
    });
  });

  it('should clear error', () => {
    expect(
      filmData.reducer(initialState, {
        type: clearResponseErrorAction.type,
      })
    ).toEqual({
      error: false,
    });
  });
});
