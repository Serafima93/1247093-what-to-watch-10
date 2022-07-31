import FilmCard from '../../components/film-card/film-card';
import { FilmStructure } from '../../types/films';

type FilmListScreenProps = {
  filmsFromState: FilmStructure[];
  maxFilms: number;
  minFilms: number;
};

function FilmList(props: FilmListScreenProps): JSX.Element {
  const { filmsFromState, minFilms, maxFilms } = props;

  return (
    <div className="catalog__films-list">
      {filmsFromState.slice(minFilms, maxFilms).map((film: FilmStructure) => (
        <FilmCard filmCard={film} key={film.id + 1} />
      ))}
    </div>
  );
}

export default FilmList;
