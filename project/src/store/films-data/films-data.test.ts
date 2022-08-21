import { filmsData, filmMask } from './films-data';
import { films, filmOne } from '../../mocks/films';
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
    const state = {
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
    expect(
      filmsData.reducer(state, {
        type: fetchFilmsAction.fulfilled.type,
        payload: films,
      })
    ).toEqual({
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
      favoriteFilms: films,
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
        payload: comments,
      })
    ).toEqual({
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
      commentsList: comments,
      favoriteFilms: [],
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
        payload: filmOne,
      })
    ).toEqual({
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
        payload: 'All genres',
      })
    ).toEqual({
      genreFromState: 'All genres',
      filmListFromState: state.allFilmsList,
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
    });

    expect(
      filmsData.reducer(state, {
        type: changeGenre.type,
        payload: 'Drama',
      })
    ).toEqual({
      genreFromState: 'Drama',
      filmListFromState: state.allFilmsList.filter(
        (item) => item.genre === 'Drama'
      ),
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
    });
  });

  it('should have reset filmData', () => {
    const state = {
      genreFromState: 'Genre',
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
    expect(filmsData.reducer(state, { type: resetFilmsData.type })).toEqual({
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
    });
  });
});
