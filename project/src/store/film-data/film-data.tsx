import { FilmData } from './../../types/state';
import { NameSpace } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { FilmStructure } from '../../types/films';
import { fetchFilmAction } from '../api-actions';
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
  isDataLoadingFilm: false,
  film: filmMask,
  error: null,
};

export const filmData = createSlice({
  name: NameSpace.FilmFromServer,
  initialState,
  reducers: {},
  //   loadFilmByIdRequest: (state) => {
  //     state.isDataLoadingFilm = true;
  //   },
  //   loadFilmByIdSuccess: (state, action) => {
  //     state.film = action.payload;
  //     state.isDataLoadingFilm = false;
  //   },
  //   loadFilmByIdError: (state, action) => {
  //     state.isDataLoadingFilm = false;
  //     state.error = action.payload;
  //   },
  // },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoadingFilm = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoadingFilm = false;
      });
  },
});

// export const { loadFilmByIdRequest, loadFilmByIdSuccess, loadFilmByIdError } =
//   filmData.actions;
