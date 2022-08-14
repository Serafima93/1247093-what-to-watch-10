import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Footer from '../../components/footer/footer';
import MoreLikeThisFilms from '../../components/more-like-this-films/more-like-this-films';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import FilmCardDescp from '../../components/film-card/film-card-desc';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderCondition } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilm } from '../../store/films-data/selectors';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchFilmAction } from '../../store/api-actions';


function Film(): JSX.Element {
  // const dispatch = useAppDispatch();
  const filmExample = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  // const { id } = useParams();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchFilmAction(id));
  //   }
  // }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(fetchFilmAction(id as string));
  // }, [dispatch,id]);

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
