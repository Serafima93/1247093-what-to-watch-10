import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import {
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
  fetchPromoFilmAction,
} from '../api-actions';
import { changeGenre, resetFilmsData } from '../actions';
import { FilmStructure } from '../../types/films';

export const filmMask: FilmStructure = {
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  runTime: 0,
  genre: '',
  id: -1,
  released: 0,
  isFavorite: false,
};

export const initialState: FilmsData = {
  genreFromState: 'All genres',
  filmListFromState: [],
  allFilmsList: [],
  similarListFromState: [],
  isDataLoading: false,
  isDataLoadingPromo: false,
  isDataLoadingSimilarFilms: false,
  isDataLoadingComments: false,
  isDataLoadingFavoriteFilms: false,
  promoFilm: filmMask,
  commentsList: [],
  favoriteFilms: [],
};

export const filmsData = createSlice({
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
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isDataLoadingSimilarFilms = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarListFromState = action.payload;
        state.isDataLoadingSimilarFilms = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoadingComments = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.commentsList = action.payload;
        state.isDataLoadingComments = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isDataLoadingFavoriteFilms = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isDataLoadingFavoriteFilms = false;
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
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isDataLoadingPromo = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoadingPromo = false;
      });
  },
});
