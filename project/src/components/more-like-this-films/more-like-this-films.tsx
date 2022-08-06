/* eslint-disable no-console */
import FilmCard from '../../components/film-card/film-card';
import { FilmStructure } from '../../types/films';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { FilmsCountForView } from '../../const';
import { getfilmListFromState } from '../../store/films-data/selectors';

function MoreLikeThisFilms(): JSX.Element {
  const filmList = useAppSelector(getfilmListFromState);

  const params = useParams();
  const filmExample = filmList.find(
    (item) => item.id === Number(params.id)
  ) as FilmStructure;

  //потом доделаю чтобы не появлялся в похожих карточках сама карточка,
  // пока это просто для теста, ибо моков мало
  const similarfilmArray: FilmStructure[] = filmList.filter(
    (item) => item.genre === filmExample.genre
  );

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {similarfilmArray
          .slice(FilmsCountForView.Min, FilmsCountForView.Similar)
          .map((item) => (
            <FilmCard filmCard={item} key={item.id + 1} />
          ))}
      </div>
    </section>
  );
}

export default MoreLikeThisFilms;
