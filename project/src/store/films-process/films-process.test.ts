import { filmProcess } from './films-process';
import { FilmsCountForView, ButtonCondition } from '../../const';
import {
  loadMoreFilms,
  changeFilmsCount,
  resetFilmsCount,
  changeTab,
  resetFilms,
} from '../actions';
const tabExample = 'Tab';

describe('Reducer: filmsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      tabFromState: 'Overview',
      MaxFilms: FilmsCountForView.Max,
      MinFilms: FilmsCountForView.Min,
      StepFilms: FilmsCountForView.Step,
      LoadMoreFilms: ButtonCondition.Unblocked,
    });
  });

  it('should change Films count', () => {
    const state = {
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    };
    expect(
      filmProcess.reducer(state, {
        type: changeFilmsCount.type,
      })
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 16,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    });
  });

  it('should load more films', () => {
    const state = {
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 0,
      LoadMoreFilms: true,
    };
    expect(
      filmProcess.reducer(state, {
        type: loadMoreFilms.type,
        payload: true,
      })
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 0,
      LoadMoreFilms: true,
    });

    expect(
      filmProcess.reducer(
        {
          tabFromState: 'Overview',
          MaxFilms: 24,
          MinFilms: 0,
          StepFilms: 0,
          LoadMoreFilms: false,
        },
        {
          type: loadMoreFilms.type,
          payload: false,
        }
      )
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 24,
      MinFilms: 0,
      StepFilms: 0,
      LoadMoreFilms: false,
    });
  });

  it('should change Tabs', () => {
    const state = {
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    };
    expect(
      filmProcess.reducer(state, {
        type: changeTab.type,
        payload: tabExample,
      })
    ).toEqual({
      tabFromState: tabExample,
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    });
  });

  it('should reset Films Count', () => {
    const state = {
      tabFromState: 'Overview',
      MaxFilms: 16,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    };
    expect(
      filmProcess.reducer(state, {
        type: resetFilmsCount.type,
      })
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    });
  });

  it('should reset Films', () => {
    const state = {
      tabFromState: tabExample,
      MaxFilms: 16,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    };
    expect(
      filmProcess.reducer(state, {
        type: resetFilms.type,
      })
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    });

    expect(
      filmProcess.reducer(
        {
          tabFromState: 'Test',
          MaxFilms: 8,
          MinFilms: 0,
          StepFilms: 8,
          LoadMoreFilms: true,
        },
        {
          type: resetFilms.type,
        }
      )
    ).toEqual({
      tabFromState: 'Overview',
      MaxFilms: 8,
      MinFilms: 0,
      StepFilms: 8,
      LoadMoreFilms: true,
    });
  });
});
