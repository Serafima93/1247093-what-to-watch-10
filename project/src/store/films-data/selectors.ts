import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films, FilmStructure, FilmComment } from '../../types/films';

export const getfilmListFromState = (state: State): Films =>state[NameSpace.Data].filmListFromState;
export const getAllFilmsList = (state: State): Films =>state[NameSpace.Data].allFilmsList;
export const getLoadedDataStatus = (state: State): boolean =>state[NameSpace.Data].isDataLoading;
export const getgenreFromState = (state: State): string => state[NameSpace.Data].genreFromState;

export const getFilm = (state: State): FilmStructure =>state[NameSpace.Data].film;
export const getSimilarFilmsList = (state: State): Films =>state[NameSpace.Data].similarListFromState;
export const getCommentsList = (state: State): FilmComment[] =>state[NameSpace.Data].commentsList;

export const getFavotiteFilms = (state: State): Films =>state[NameSpace.Data].favoriteFilms;
export const getPromoFilm = (state: State): FilmStructure =>state[NameSpace.Data].promoFilm;

