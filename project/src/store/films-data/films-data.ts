import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import { fetchFilmAction } from '../api-actions';
import { changeGenre, resetFilmsData } from '../actions';

const initialState: FilmsData = {
  genreFromState: 'All genres',
  filmListFromState: [],
  allFilmsList: [],
  isDataLoading: false,
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.filmListFromState = action.payload;
        state.allFilmsList = action.payload;
        state.isDataLoading = false;
      })
      .addCase(changeGenre, (state, action) => {
        state.genreFromState = action.payload;
        state.filmListFromState =
          action.payload === 'All genres'
            ? state.allFilmsList
            : state.filmListFromState.filter((item) => item.genre === action.payload);
      })
      .addCase(resetFilmsData, (state) => {
        state.filmListFromState = state.allFilmsList;
        state.genreFromState = 'All genres';
        // пришлось поделить действие, ибо не знаю как выйти к полному стейту
      });
  },
});
