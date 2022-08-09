/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetFilms, resetFilmsData, changeGenre } from '../../store/actions';
import { getgenreFromState } from '../../store/films-data/selectors';

type GenreProp = {
  filmGenre: string;
};

function Genre(props: GenreProp): JSX.Element {
  const { filmGenre } = props;
  const genre = useAppSelector(getgenreFromState);

  const dispatch = useAppDispatch();

  return (
    <li
      className={
        filmGenre === genre
          ? 'catalog__genres-item catalog__genres-item--active'
          : 'catalog__genres-item'
      }
    >
      <a
        href="#s"
        className="catalog__genres-link"
        onClick={() => {
          dispatch(resetFilmsData());
          dispatch(resetFilms());
          dispatch(changeGenre(filmGenre));
        }}
      >
        {filmGenre}
      </a>
    </li>
  );
}
export default Genre;
