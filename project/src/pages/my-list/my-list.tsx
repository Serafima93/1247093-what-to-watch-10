
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import FilmCard from '../../components/film-card/film-card';
import { FilmStructure } from '../../types/films';
import { useAppSelector } from '../../hooks';
import { getFavotiteFilms } from '../../store/films-data/selectors';

function MyList(): JSX.Element {
  const films = useAppSelector(getFavotiteFilms);


  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">
          My list{' '}
          <span className="user-page__film-count">{films.length}</span>
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
