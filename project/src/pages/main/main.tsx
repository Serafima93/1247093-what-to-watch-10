/* eslint-disable no-console */
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more/show-more';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';

function MainScreen(): JSX.Element {
  const filmsFromState = useAppSelector((state) => state.filmListFromState);
  const genreListFromState = useAppSelector((state) => state.allFilmsList);
  const buttonConditionFromState = useAppSelector(
    (state) => state.LoadMoreFilms
  );
  const incFilmsLength = useAppSelector((state) => state.MaxFilms);
  const minFilmsLength = useAppSelector((state) => state.MinFilms);

  // const filmCard = filmsFromState[0];

  const [isVisibleFilmButton, setVisibleFilmButton] = useState(
    buttonConditionFromState
  );
  if (isVisibleFilmButton !== buttonConditionFromState) {
    setVisibleFilmButton((prevState) => !prevState);
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-header.jpg"
            alt="The Grand Budapest Hotel"
          />
          {/* <img
            src={filmCard.backgroundImage}
            alt={filmCard.name}
          /> */}
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header />

        {/* <div className="film-card__wrap">
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
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmsList={genreListFromState} />

          <FilmList
            filmsFromState={filmsFromState}
            MaxFilms={incFilmsLength}
            MinFilms={minFilmsLength}
          />
          {isVisibleFilmButton && <ShowMoreButton />}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
