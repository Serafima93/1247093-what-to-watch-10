/* eslint-disable no-console */
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more/show-more';
import FilmCardDescp from '../../components/film-card/film-card-desc';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { AuthorizationStatus, HeaderCondition } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getallFilmsList } from '../../store/films-data/selectors';
import { getLoadMoreFilms } from '../../store/films-process/selectors';

function MainScreen(): JSX.Element {
  const allFilmListFromState = useAppSelector(getallFilmsList);
  const buttonConditionFromState = useAppSelector(getLoadMoreFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const filmCard = allFilmListFromState[0];
  const [isVisibleFilmButton, setVisibleFilmButton] = useState(
    buttonConditionFromState
  );
  if (isVisibleFilmButton !== buttonConditionFromState) {
    setVisibleFilmButton((prevState) => !prevState);
  }

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
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />
          <FilmList />
          {isVisibleFilmButton && <ShowMoreButton />}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
