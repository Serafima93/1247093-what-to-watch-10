import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Films, FilmStructure, FilmComment } from '../types/films';
import {
  redirectToRoute,
  loadFilmById,
  isErrorResponseAction,
  clearResponseErrorAction,
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';
import { FavoriteFilmData } from '../types/favorite-film-data';

export const fetchFilmsAction = createAsyncThunk<
  Films,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Films>(APIRoute.Films);
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('film/fetchOpenFilm', async (id: string, { dispatch, extra: api }) => {
  try {
    if (!id) {
      dispatch(isErrorResponseAction(true));
      dispatch(clearResponseErrorAction());
    }
    const oneServerFilm = await api.get<FilmStructure>(`/films/${id}`);
    dispatch(loadFilmById(oneServerFilm.data));
    dispatch(fetchSimilarFilmsAction(id));
    dispatch(fetchCommentsAction(id));
  } catch {
    dispatch(isErrorResponseAction(true));
  }
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  Films,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Films>(`/films/${_arg}/similar`);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.MyList));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const fetchCommentsAction = createAsyncThunk<
  FilmComment[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmComment[]>(`/comments/${_arg}`);
  return data;
});

export const addCommentAction = createAsyncThunk<
  void,
  CommentData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/addComment',
  async ({ comment, rating, id }, { dispatch, extra: api }) => {
    await api.post<CommentData>(`/comments/${id}`, { comment, rating });
  }
);

export const fetchFavoriteFilmsAction = createAsyncThunk<
  Films,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Films>(APIRoute.Favorite);
  return data;
});

export const addFavoriteFilmAction = createAsyncThunk<
  void,
  FavoriteFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/addFavoriteFilm', async ({ id, status }, { dispatch, extra: api }) => {
  await api.post<FavoriteFilmData>(`/favorite/${id}/${status}`);
});

export const fetchPromoFilmAction = createAsyncThunk<
  FilmStructure,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmStructure>(APIRoute.PromoFilm);
  return data;
});
