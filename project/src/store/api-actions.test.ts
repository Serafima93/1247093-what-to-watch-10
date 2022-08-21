import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  fetchFavoriteFilmsAction,
  fetchCommentsAction,
  fetchPromoFilmAction,
  fetchFilmAction,
  addCommentAction,
  addFavoriteFilmAction,
} from './api-actions';
import { loadFilmById } from './actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import { FavoriteFilmData } from '../types/favorite-film-data';
import { redirectToRoute } from './actions';
import { films, filmOne, mockId } from '../mocks/films';
import { comments } from '../mocks/comments';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: 'Sima1234' };

    mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should dispatch Load_Films when GET /films', async () => {
    mockAPI.onGet(APIRoute.Films).reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Similar_Films', async () => {
    mockAPI.onGet(`/films/${mockId}/similar`).reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type,
    ]);
  });

  it('should dispatch Load_Favorite_Films', async () => {
    mockAPI.onGet(APIRoute.Favorite).reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]);
  });

  it('should dispatch Comments', async () => {
    mockAPI.onGet(`/comments/${mockId}`).reply(200, comments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type,
    ]);
  });

  it('should dispatch Promo-Film', async () => {
    mockAPI.onGet(APIRoute.PromoFilm).reply(200, filmOne);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type,
    ]);
  });

  it('should dispatch Film by Id', async () => {
    mockAPI.onGet(`/films/${mockId}`).reply(200, filmOne);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      loadFilmById.type,
      fetchSimilarFilmsAction.pending.type,
      fetchCommentsAction.pending.type,
      fetchFilmAction.fulfilled.type,
    ]);
  });

  it('should add Comment', async () => {
    const fakeComment: CommentData = { comment: 'test', rating: 10, id: 1 };

    mockAPI.onPost(`/comments/${mockId}`).reply(200);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(addCommentAction(fakeComment));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type,
    ]);
  });

  it('should add Favorite-film', async () => {
    const fakeData: FavoriteFilmData = { status: 0, id: 1 };

    mockAPI.onPost(`/favorite/${fakeData.id}/${fakeData.status}`).reply(200);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(addFavoriteFilmAction(fakeData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addFavoriteFilmAction.pending.type,
      addFavoriteFilmAction.fulfilled.type,
    ]);
  });
});
