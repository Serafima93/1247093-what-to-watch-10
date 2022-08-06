import FilmCard from '../../components/film-card/film-card';
import { FilmStructure } from '../../types/films';
import { useAppSelector } from '../../hooks';

import { getfilmListFromState } from '../../store/films-data/selectors';
import { getMaxFilms, getMinFilms } from '../../store/films-process/selectors';

function FilmList(): JSX.Element {
  const maxFilms = useAppSelector(getMaxFilms);
  const minFilms = useAppSelector(getMinFilms);
  const filmsFromState = useAppSelector(getfilmListFromState);

  return (
    <div className="catalog__films-list">
      {filmsFromState.slice(minFilms, maxFilms).map((film: FilmStructure) => (
        <FilmCard filmCard={film} key={film.id} />
      ))}
    </div>
  );
}

export default FilmList;
