import { FilmData } from './../../types/state';
import { NameSpace } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { FilmStructure } from '../../types/films';
import {
  loadFilmById,
  isErrorResponseAction,
  clearResponseErrorAction,
} from '../actions';

const filmMask: FilmStructure = {
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

const initialState: FilmData = {
  film: filmMask,
  error: false,
};

export const filmData = createSlice({
  name: NameSpace.FilmFromServer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadFilmById, (state, action) => {
        state.film = action.payload;
      })
      .addCase(isErrorResponseAction, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearResponseErrorAction, (state) => {
        state.error = false;
      });
  },
});
