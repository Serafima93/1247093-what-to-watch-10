import Genre from '../../components/genre-list/genre';
import { FilmStructure } from '../../types/films';
import { useAppSelector } from '../../hooks';
import { getallFilmsList } from '../../store/films-data/selectors';

function GenreList(): JSX.Element {
  const genreListFromState = useAppSelector(getallFilmsList);

  let filmGenreArray: string[] = ['All genres'];
  genreListFromState.forEach((item: FilmStructure) => {
    filmGenreArray.push(item.genre);
  });
  filmGenreArray = [...new Set(filmGenreArray)];

  return (
    <>
      <ul className="catalog__genres-list">
        {filmGenreArray.map((item) => (
          <Genre filmGenre={item} key={item} />
        ))}
      </ul>
      {}
    </>
  );
}

export default GenreList;
