import Header from '../../components/header/header';
import { FilmStructure } from '../../types/films';

type FilmProps = {
  filmCard: FilmStructure;
};

function Film(props: FilmProps): JSX.Element {
  const { filmCard } = props;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={filmCard.previewImage} alt={filmCard.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{filmCard.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{filmCard.genre}</span>
              <span className="film-card__year">{filmCard.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">9</span>
              </button>
              <a href="add-review.html" className="btn film-card__button">
                Add review
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img
              src={filmCard.posterImage}
              alt={` ${filmCard.name} poster`}
              width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <nav className="film-nav film-card__nav">
              <ul className="film-nav__list">
                <li className="film-nav__item film-nav__item--active">
                  <a href="#" className="film-nav__link">
                    Overview
                  </a>
                </li>
                <li className="film-nav__item">
                  <a href="#" className="film-nav__link">
                    Details
                  </a>
                </li>
                <li className="film-nav__item">
                  <a href="#" className="film-nav__link">
                    Reviews
                  </a>
                </li>
              </ul>
            </nav>

            <div className="film-rating">
              <div className="film-rating__score">{filmCard.rating}</div>
              <p className="film-rating__meta">
                <span className="film-rating__level">{filmCard.mark}</span>
                <span className="film-rating__count">
                  {filmCard.scoresCount} ratings
                </span>
              </p>
            </div>

            <div className="film-card__text">
              {filmCard.description}

              <p className="film-card__director">
                <strong>Director: {filmCard.director}</strong>
              </p>

              <p className="film-card__starring">
                <strong>
                  {filmCard.starring}
                  and other
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Film;
