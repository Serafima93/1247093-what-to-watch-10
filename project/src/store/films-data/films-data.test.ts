import { filmsData, filmMask, initialState } from './films-data';
import { films, filmOne } from '../../mocks/mocks';
import { comments } from '../../mocks/comments';
import {
  fetchFilmsAction,
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
} from '../api-actions';
import { resetFilmsData, changeGenre } from '../actions';

describe('Reducer: filmsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
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
    });
  });

  it('should update films by load films', () => {
    expect(
      filmsData.reducer(initialState, {
        type: fetchFilmsAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
      allFilmsList: films,
      filmListFromState: films,
      isDataLoading: false,
    });
  });

  it('should update Similar films by load films', () => {
    const state = {
      genreFromState: 'All genres',
      filmListFromState: films,
      allFilmsList: films,
      similarListFromState: [],
      isDataLoading: false,
      isDataLoadingPromo: false,
      isDataLoadingSimilarFilms: false,
      isDataLoadingComments: false,
      isDataLoadingFavoriteFilms: false,
      promoFilm: filmOne,
      commentsList: [],
      favoriteFilms: [],
    };
    expect(
      filmsData.reducer(state, {
        type: fetchSimilarFilmsAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
      similarListFromState: films,
      isDataLoadingSimilarFilms: false,
    });
  });

  it('should update Favorite films by load films', () => {
    const state = {
      genreFromState: 'All genres',
      filmListFromState: films,
      allFilmsList: films,
      similarListFromState: [],
      isDataLoading: false,
      isDataLoadingPromo: false,
      isDataLoadingSimilarFilms: false,
      isDataLoadingComments: false,
      isDataLoadingFavoriteFilms: false,
      promoFilm: filmOne,
      commentsList: [],
      favoriteFilms: [],
    };
    expect(
      filmsData.reducer(state, {
        type: fetchFavoriteFilmsAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
      favoriteFilms: films,
      isDataLoadingFavoriteFilms: false,
    });
  });

  it('should update Comments by load films', () => {
    const state = {
      genreFromState: 'All genres',
      filmListFromState: films,
      allFilmsList: films,
      similarListFromState: films,
      isDataLoading: false,
      isDataLoadingPromo: false,
      isDataLoadingSimilarFilms: false,
      isDataLoadingComments: false,
      isDataLoadingFavoriteFilms: false,
      promoFilm: filmOne,
      commentsList: [],
      favoriteFilms: [],
    };
    expect(
      filmsData.reducer(state, {
        type: fetchCommentsAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
      commentsList: comments,
      isDataLoadingComments: false,
    });
  });

  it('should update Promo-film by load film', () => {
    const state = {
      genreFromState: 'All genres',
      filmListFromState: films,
      allFilmsList: films,
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
    expect(
      filmsData.reducer(state, {
        type: fetchPromoFilmAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
      promoFilm: filmMask,
      isDataLoadingPromo: false,
    });
  });

  it('should change filmData main genre', () => {
    const state = {
      genreFromState: 'All genres',
      filmListFromState: films,
      allFilmsList: films,
      similarListFromState: [],
      isDataLoading: false,
      isDataLoadingPromo: false,
      isDataLoadingSimilarFilms: false,
      isDataLoadingComments: false,
      isDataLoadingFavoriteFilms: false,
      promoFilm: filmOne,
      commentsList: [],
      favoriteFilms: [],
    };
    expect(
      filmsData.reducer(state, {
        type: changeGenre.type,
        payload: films[0].genre,
      })
    ).toEqual({ genreFromState: films[0].genre });
  });

  it('should have reset filmData', () => {
    const state = {
      genreFromState: films[0].genre,
      filmListFromState: films, //Изменить на генерацию?
      allFilmsList: films,
      similarListFromState: [],
      isDataLoading: false,
      isDataLoadingPromo: false,
      isDataLoadingSimilarFilms: false,
      isDataLoadingComments: false,
      isDataLoadingFavoriteFilms: false,
      promoFilm: filmOne,
      commentsList: [],
      favoriteFilms: [],
    };
    expect(filmsData.reducer(state, { type: resetFilmsData.type })).toEqual({
      filmListFromState: state.allFilmsList,
      genreFromState: 'All genres',
    });
  });
});
