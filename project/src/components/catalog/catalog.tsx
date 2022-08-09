import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more/show-more';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getLoadMoreFilms } from '../../store/films-process/selectors';

function Catalog(): JSX.Element {
  const buttonConditionFromState = useAppSelector(getLoadMoreFilms);

  const [isVisibleFilmButton, setVisibleFilmButton] = useState(
    buttonConditionFromState
  );
  if (isVisibleFilmButton !== buttonConditionFromState) {
    setVisibleFilmButton((prevState) => !prevState);
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList />
      <FilmList />
      {isVisibleFilmButton && <ShowMoreButton />}
    </section>
  );
}

export default Catalog;
