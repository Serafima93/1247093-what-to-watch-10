/* eslint-disable no-console */
import FilmCard from '../../components/film-card/film-card';

import { useAppSelector } from '../../hooks';
import { FilmsCountForView } from '../../const';
import { getSimilarFilmsList } from '../../store/films-data/selectors';

function MoreLikeThisFilms(): JSX.Element {
  const similarfilmArray = useAppSelector(getSimilarFilmsList);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {similarfilmArray
          .slice(FilmsCountForView.Min, FilmsCountForView.Similar)
          .map((item) => (
            <FilmCard filmCard={item} key={item.id} />
          ))}
      </div>
    </section>
  );
}

export default MoreLikeThisFilms;
