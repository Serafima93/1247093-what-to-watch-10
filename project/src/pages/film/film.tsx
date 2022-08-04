/* eslint-disable no-console */
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Buttons from '../../components/buttons/buttons';
import { FilmStructure } from '../../types/films';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { FilmsCountForView, AuthorizationStatus } from '../../const';
import { getfilmListFromState } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type FilmProps = {
  filmsList: FilmStructure[];
};

function Film(props: FilmProps): JSX.Element {
  const { filmsList } = props;
  const params = useParams();
  const filmExample = filmsList.find(
    (item) => item.id === Number(params.id)
  ) as FilmStructure;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const filmListFromState = useAppSelector(getfilmListFromState);

  //потом доделаю чтобы не появлялся в похожих карточках сама карточка,
  // пока это просто для теста, ибо моков мало
  const similarfilmArray: FilmStructure[] = filmListFromState.filter(
    (item) => item.genre === filmExample.genre
  );

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <Header filmCard={filmExample} />

          {authorizationStatus === AuthorizationStatus.Auth && (
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{filmExample.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{filmExample.genre}</span>
                  <span className="film-card__year">
                    {filmExample.released}
                  </span>
                </p>
                <div className="film-card__buttons">
                  <Buttons filmExample={filmExample} />
                  <a href="add-review.html" className="btn film-card__button">
                    Add review
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={filmExample.posterImage}
                alt={` ${filmExample.name} poster`}
                width="218"
                height="327"
              />
            </div>
            <Tabs filmExample={filmExample} />
          </div>
        </div>
      </section>
      <div className="page-content">
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

        <Footer />
      </div>
    </>
  );
}

export default Film;
