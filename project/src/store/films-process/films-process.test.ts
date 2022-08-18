import { filmProcess /*, initialState*/ } from './films-process';
import { FilmsCountForView, ButtonCondition } from '../../const';
// import {
//   loadMoreFilms,
//   changeFilmsCount,
//   resetFilmsCount,
//   changeTab,
//   resetFilms,
// } from '../actions';
// const tabExample = 'Tab';

describe('Reducer: filmsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      tabFromState: 'Overview',
      MaxFilms: FilmsCountForView.Max, //заменить?
      MinFilms: FilmsCountForView.Min,
      StepFilms: FilmsCountForView.Step,
      LoadMoreFilms: ButtonCondition.Unblocked,
    });
  });

  // it('should change Films count', () => {
  //   expect(
  //     filmProcess.reducer(initialState, {
  //       type: changeFilmsCount.type,
  //     })
  //   ).toEqual({ MaxFilms: initialState.MaxFilms + initialState.StepFilms });
  // });

  // it('should load more films', () => {
  //   expect(
  //     filmProcess.reducer(initialState, {
  //       type: loadMoreFilms.type,
  //       payload: true, // а если false? Доп проверка?
  //     })
  //   ).toEqual({ LoadMoreFilms: ButtonCondition.Unblocked });
  // });

  // it('should change Tabs', () => {
  //   expect(
  //     filmProcess.reducer(initialState, {
  //       type: changeTab.type,
  //       tabFromState: tabExample,
  //     })
  //   ).toEqual({ tabFromState: tabExample });
  // });

  // it('should reset Films Count', () => {
  //   const state = {
  //     tabFromState: 'Overview',
  //     MaxFilms: 16,
  //     MinFilms: FilmsCountForView.Min,
  //     StepFilms: 8, // глючит
  //     LoadMoreFilms: ButtonCondition.Unblocked,
  //   };
  //   expect(
  //     filmProcess.reducer(state, {
  //       type: resetFilmsCount.type,
  //     })
  //   ).toEqual({ MaxFilms: FilmsCountForView.Max });
  // });

  // it('should reset Films', () => {
  //   const state = {
  //     tabFromState: tabExample,
  //     MaxFilms: 16,
  //     MinFilms: FilmsCountForView.Min,
  //     StepFilms: 8,
  //     LoadMoreFilms: ButtonCondition.Blocked,
  //   };
  //   expect(
  //     filmProcess.reducer(state, {
  //       type: resetFilms.type,
  //     })
  //   ).toEqual({
  //     LoadMoreFilms: ButtonCondition.Unblocked,
  //     MaxFilms: FilmsCountForView.Max,
  //     tabFromState: 'Overview',
  //   });
  // });
});
