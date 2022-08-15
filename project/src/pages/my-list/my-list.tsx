import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import Spiner from '../../components/spiner/spiner';
import { FilmStructure } from '../../types/films';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  getFavotiteFilms,
  getLoadedDataStatusFavorite,
} from '../../store/films-data/selectors';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';

function MyList(): JSX.Element {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFavotiteFilms);
  const isDataLoadingFavorite = useAppSelector(getLoadedDataStatusFavorite);

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  if (isDataLoadingFavorite) {
    return <Spiner />;
    // Добавить обработку ошибок
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{films.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {films.map((film: FilmStructure) => (
            <FilmCard filmCard={film} key={film.id} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
