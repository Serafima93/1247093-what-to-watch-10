import { filmData, filmMask } from './film-data';
import { filmOne } from '../../mocks/films';
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
    const state = {
      film: filmMask,
      error: false,
    };
    expect(
      filmData.reducer(state, {
        type: loadFilmById.type,
        payload: filmOne,
      })
    ).toEqual({
      film: filmOne,
      error: false,
    });
  });

  it('should load film by id Error', () => {
    const state = {
      film: filmMask,
      error: false,
    };
    expect(
      filmData.reducer(state, {
        type: isErrorResponseAction.type,
        payload: true,
      })
    ).toEqual({
      film: filmMask,
      error: true,
    });
  });

  it('should clear error', () => {
    const state = {
      film: filmMask,
      error: true,
    };
    expect(
      filmData.reducer(state, {
        type: clearResponseErrorAction.type,
      })
    ).toEqual({
      film: filmMask,
      error: false,
    });
  });
});
