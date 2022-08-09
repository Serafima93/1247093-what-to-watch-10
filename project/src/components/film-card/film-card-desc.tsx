import { FilmStructure } from '../../types/films';
import Buttons from '../buttons/buttons';
import { Link } from 'react-router-dom';

type cardParameters = {
  filmCard: FilmStructure;
  statusPlace: boolean;
};

function FilmCardDescp(props: cardParameters): JSX.Element {
  const { filmCard, statusPlace } = props;

  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{filmCard.name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{filmCard.genre}</span>
        <span className="film-card__year">{filmCard.released}</span>
      </p>

      <div className="film-card__buttons">
        <Buttons filmExample={filmCard} />
        {!statusPlace && (
          <Link
            to={`/films/${filmCard.id}/review`}
            className="btn film-card__button"
          >
            Add review
          </Link>
        )}
      </div>
    </div>
  );
}

export default FilmCardDescp;
