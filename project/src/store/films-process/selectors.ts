import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { FilmReview } from '../../types/films';

export const gettabFromState = (state: State): string => state[NameSpace.Film].tabFromState;
export const getMaxFilms = (state: State): number => state[NameSpace.Film].MaxFilms;
export const getMinFilms = (state: State): number => state[NameSpace.Film].MinFilms;
export const getStepFilms = (state: State): number => state[NameSpace.Film].StepFilms;
export const getLoadMoreFilms = (state: State): boolean => state[NameSpace.Film].LoadMoreFilms;

export const getallReviewsList = (state: State): FilmReview[] => state[NameSpace.Film].allReviewsList;


