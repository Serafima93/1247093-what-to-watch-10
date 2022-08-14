// import { useEffect } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import FilmCardDescp from '../../components/film-card/film-card-desc';
import FilmCardPoster from '../../components/film-card/film-card-poster';
// import LoadingScreen from '../../pages/loading-screen/loading-screen';

import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderCondition } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getPromoFilm } from '../../store/films-data/selectors';
// import { fetchPromoFilmAction } from '../../store/api-actions';


function MainScreen(): JSX.Element {

  // const dispatch = useAppDispatch();
  const filmCard = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  // useEffect(() => {
  //   dispatch(fetchPromoFilmAction());
  // }, [dispatch]);
  // if (!filmCard) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <section className="film-card">
        <Header filmCard={filmCard} />

        {authorizationStatus === AuthorizationStatus.Auth && (
          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <FilmCardPoster filmCard={filmCard} />
              </div>
              <FilmCardDescp
                statusPlace={HeaderCondition.Main}
                filmCard={filmCard}
              />
            </div>
          </div>
        )}
      </section>

      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
