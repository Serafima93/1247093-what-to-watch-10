import { store } from '../store/index.js';
import { FilmsCountForView, AuthorizationStatus } from '../const';
import { Films } from './films';
import { reviews } from '../mocks/reviews';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type FilmsData = {
  filmListFromState: Films;
  allFilmsList: Films;
  isDataLoading: boolean;
  genreFromState: string;

};

export type FilmProcess = {
  tabFromState: string;
  allReviewsList: typeof reviews;
  MaxFilms: FilmsCountForView;
  MinFilms: FilmsCountForView;
  StepFilms: FilmsCountForView.Step;
  LoadMoreFilms: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};
