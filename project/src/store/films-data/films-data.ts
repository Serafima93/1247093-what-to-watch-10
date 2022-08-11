import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import {
  fetchFilmsAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
} from '../api-actions';
import { changeGenre, resetFilmsData } from '../actions';
import { FilmStructure } from '../../types/films';

const initialState: FilmsData = {
  genreFromState: 'All genres',
  filmListFromState: [],
  allFilmsList: [],
  similarListFromState: [],
  isDataLoading: false,
  film: {} as FilmStructure,
  commentsList: [],
  favoriteFilms: [],
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.filmListFromState = action.payload;
        state.allFilmsList = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarListFromState = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.commentsList = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isDataLoading = false;
      })
      .addCase(changeGenre, (state, action) => {
        state.genreFromState = action.payload;
        state.filmListFromState =
          action.payload === 'All genres'
            ? state.allFilmsList
            : state.filmListFromState.filter((item) => item.genre === action.payload);})
      .addCase(resetFilmsData, (state) => {
        state.filmListFromState = state.allFilmsList;
        state.genreFromState = 'All genres';
        // пришлось поделить действие, ибо не знаю как выйти к полному стейту
      });
  },
});
