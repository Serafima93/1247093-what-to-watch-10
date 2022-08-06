/* eslint-disable no-console */
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';
import MoreLikeThisFilms from '../../components/more-like-this-films/more-like-this-films';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import FilmCardDescp from '../../components/film-card/film-card-desc';

import { FilmStructure } from '../../types/films';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderCondition } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getallFilmsList } from '../../store/films-data/selectors';

function Film(): JSX.Element {
  const filmsList = useAppSelector(getallFilmsList);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const params = useParams();
  const filmExample = filmsList.find((item) => item.id === Number(params.id)) as FilmStructure;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <Header filmCard={filmExample} />

          {authorizationStatus === AuthorizationStatus.Auth && (
            <div className="film-card__wrap">
              <FilmCardDescp
                statusPlace={HeaderCondition.Film}
                filmCard={filmExample}
              />
            </div>
          )}
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <FilmCardPoster filmCard={filmExample} />
            </div>
            <Tabs filmExample={filmExample} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <MoreLikeThisFilms />
        <Footer />
      </div>
    </>
  );
}

export default Film;
