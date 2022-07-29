import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
// import { FilmStructure } from '../types/films';
import {
  downloadFilms,
  // requireAuthorization,
  setError,
  setDataLoadedStatus,
} from './actions';
// import { saveToken, dropToken } from '../services/token';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
// import { AuthData } from '../types/auth-data';
// import { UserData } from '../types/user-data';
import { store } from './';

export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<any>(APIRoute.Films);
  dispatch(setDataLoadedStatus(true));
  dispatch(downloadFilms(data));
  dispatch(setDataLoadedStatus(false));
});


// export const checkAuthAction = createAsyncThunk<
//   void,
//   undefined,
//   {
//     dispatch: AppDispatch;
//     state: State;
//     extra: AxiosInstance;
//   }
// >('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
//   try {
//     await api.get(APIRoute.Login);
//     dispatch(requireAuthorization(AuthorizationStatus.Auth));
//   } catch {
//     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//   }
// });

// export const loginAction = createAsyncThunk<
//   void,
//   AuthData,
//   {
//     dispatch: AppDispatch;
//     state: State;
//     extra: AxiosInstance;
//   }
// >(
//   'user/login',
//   async ({ login: email, password }, { dispatch, extra: api }) => {
//     const {
//       data: { token },
//     } = await api.post<UserData>(APIRoute.Login, { email, password });
//     saveToken(token);
//     dispatch(requireAuthorization(AuthorizationStatus.Auth));
//   }
// );

// export const logoutAction = createAsyncThunk<
//   void,
//   undefined,
//   {
//     dispatch: AppDispatch;
//     state: State;
//     extra: AxiosInstance;
//   }
// >('user/logout', async (_arg, { dispatch, extra: api }) => {
//   await api.delete(APIRoute.Logout);
//   dropToken();
//   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
// });