/* eslint-disable no-console */
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';
import MoreLikeThisFilms from '../../components/more-like-this-films/more-like-this-films';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import FilmCardDescp from '../../components/film-card/film-card-desc';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus, HeaderCondition, idForCheck } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilm, getError} from '../../store/film-data/selectors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilmAction } from '../../store/api-actions';
import Spiner from '../../components/spiner/spiner';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function Film(): JSX.Element {
  const error = useAppSelector(getError);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const filmExample = useAppSelector(getFilm);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFilmAction(id as string));
  }, [dispatch, id]);

  if(error && filmExample.id === idForCheck) {
    return <NotFoundScreen />;
  }

  if (filmExample.id === idForCheck) {
    return <Spiner />;
  }

  return (
    <>
      <section
        className="film-card film-card--full"
        style={{ background: filmExample.backgroundColor }}
      >
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
