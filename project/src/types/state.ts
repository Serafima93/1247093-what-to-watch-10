import { store } from '../store/index.js';
import { FilmsCountForView, AuthorizationStatus } from '../const';
import { Films, FilmStructure, FilmComment } from './films';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type FilmsData = {
  filmListFromState: Films;
  allFilmsList: Films;
  isDataLoading: boolean;
  genreFromState: string;
  film: FilmStructure;
  similarListFromState: Films;
  commentsList: FilmComment[];
};

export type FilmProcess = {
  tabFromState: string;
  MaxFilms: FilmsCountForView;
  MinFilms: FilmsCountForView;
  StepFilms: FilmsCountForView.Step;
  LoadMoreFilms: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};
