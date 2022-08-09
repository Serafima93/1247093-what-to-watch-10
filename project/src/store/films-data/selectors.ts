import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films } from '../../types/films';

export const getfilmListFromState = (state: State): Films =>state[NameSpace.Data].filmListFromState;
export const getallFilmsList = (state: State): Films =>state[NameSpace.Data].allFilmsList;
export const getLoadedDataStatus = (state: State): boolean =>state[NameSpace.Data].isDataLoading;
export const getgenreFromState = (state: State): string => state[NameSpace.Data].genreFromState;
