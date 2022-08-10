import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const gettabFromState = (state: State): string => state[NameSpace.Film].tabFromState;
export const getMaxFilms = (state: State): number => state[NameSpace.Film].MaxFilms;
export const getMinFilms = (state: State): number => state[NameSpace.Film].MinFilms;
export const getStepFilms = (state: State): number => state[NameSpace.Film].StepFilms;
export const getLoadMoreFilms = (state: State): boolean => state[NameSpace.Film].LoadMoreFilms;


