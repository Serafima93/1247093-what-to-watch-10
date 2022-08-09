/* eslint-disable no-console */

import { FilmStructure } from '../../types/films';
import { useNavigate } from 'react-router-dom';

type ButtonsProps = {
  filmExample: FilmStructure;
};

function Buttons(props: ButtonsProps): JSX.Element {
  const navigate = useNavigate();
  const { filmExample } = props;

  return (
    <>
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={() => navigate(`/player/${filmExample.id}`)}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={() => navigate('/myList')}
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">9</span>
      </button>
    </>
  );
}

export default Buttons;
