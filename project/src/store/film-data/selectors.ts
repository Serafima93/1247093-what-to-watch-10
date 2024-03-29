import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { FilmStructure } from '../../types/films';

export const getFilm = (state: State): FilmStructure =>state[NameSpace.FilmFromServer].film;
export const getError = (state: State) => state[NameSpace.FilmFromServer].error;
