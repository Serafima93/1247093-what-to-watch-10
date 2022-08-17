import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmsData } from './films-data/films-data';
import { filmProcess } from './films-process/films-process';
import { userProcess } from './user-process/user-process';
import { filmData } from './film-data/film-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: filmsData.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.FilmFromServer]: filmData.reducer,
});
