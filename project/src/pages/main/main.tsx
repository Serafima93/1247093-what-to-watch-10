/* eslint-disable no-console */
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more/show-more';
import Buttons from '../../components/buttons/buttons';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {
  getfilmListFromState,
  getallFilmsList,
} from '../../store/films-data/selectors';
import {
  getMaxFilms,
  getMinFilms,
  getLoadMoreFilms,
} from '../../store/films-process/selectors';

function MainScreen(): JSX.Element {

  const filmsFromState = useAppSelector(getfilmListFromState);
  const genreListFromState = useAppSelector(getallFilmsList);
  const buttonConditionFromState = useAppSelector(getLoadMoreFilms);
  const incFilmsLength = useAppSelector(getMaxFilms);
  const minFilmsLength = useAppSelector(getMinFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const filmCard = filmsFromState[0];
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
                <img
                  src={filmCard.posterImage}
                  alt={` ${filmCard.name} poster`}
                  width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{filmCard.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{filmCard.genre}</span>
                  <span className="film-card__year">{filmCard.released}</span>
                </p>

                <div className="film-card__buttons">
                  <Buttons filmExample={filmCard} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsList={genreListFromState} />

          <FilmList
            filmsFromState={filmsFromState}
            maxFilms={incFilmsLength}
            minFilms={minFilmsLength}
          />
          {isVisibleFilmButton && <ShowMoreButton />}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
