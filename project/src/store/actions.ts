import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/films';
import { AppRoute, AuthorizationStatus } from '../const';

export const resetFilms = createAction('film/resetFilms');
export const changeGenre = createAction(
  'film/changeGenre',
  (value: string) => ({
    payload: value,
  })
);
export const loadMoreFilms = createAction(
  'button/loadmore',
  (condition: boolean) => ({
    payload: condition,
  })
);
export const changeFilmsCount = createAction('film/changeCount');
export const resetFilmsCount = createAction('film/resetCount');
export const changeTab = createAction('tab/changeTab', (value: string) => ({
  payload: value,
}));
export const downloadFilms = createAction<Films>('data/loadFilms');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const setDataLoadedStatus = createAction<boolean>(
  'data/setDataLoadedStatus'
);
export const redirectToRoute = createAction<AppRoute>('film/redirectToRoute');
