import { createSlice } from '@reduxjs/toolkit';
import { FilmsCountForView, ButtonCondition, NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import {
  loadMoreFilms,
  changeFilmsCount,
  resetFilmsCount,
  changeTab,
  resetFilms,
} from '../actions';

export const initialState: FilmProcess = {
  tabFromState: 'Overview',
  MaxFilms: FilmsCountForView.Max,
  MinFilms: FilmsCountForView.Min,
  StepFilms: FilmsCountForView.Step,
  LoadMoreFilms: ButtonCondition.Unblocked,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeFilmsCount, (state) => {
        state.MaxFilms = state.MaxFilms + state.StepFilms;
      })
      .addCase(loadMoreFilms, (state, action) => {
        state.LoadMoreFilms = action.payload;
      })
      .addCase(changeTab, (state, action) => {
        state.tabFromState = action.payload;
      })
      .addCase(resetFilmsCount, (state) => {
        state.MaxFilms = FilmsCountForView.Max;
      })
      .addCase(resetFilms, (state) => {
        state.LoadMoreFilms = ButtonCondition.Unblocked;
        state.MaxFilms = FilmsCountForView.Max;
        state.MinFilms = FilmsCountForView.Min;
        state.StepFilms = FilmsCountForView.Step;
        state.tabFromState = 'Overview';
      });
  },
});
