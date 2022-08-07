/* eslint-disable no-console */
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import FilmCardDescp from '../../components/film-card/film-card-desc';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderCondition } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getallFilmsList } from '../../store/films-data/selectors';

function MainScreen(): JSX.Element {
  const allFilmListFromState = useAppSelector(getallFilmsList);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const filmCard = allFilmListFromState[0];

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
