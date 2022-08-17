import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilmsCount, loadMoreFilms } from '../../store/actions';
import { ButtonCondition } from '../../const';
import { useEffect } from 'react';
import { getfilmListFromState } from '../../store/films-data/selectors';
import { getMaxFilms, getMinFilms } from '../../store/films-process/selectors';

function ShowMoreButton(): JSX.Element {
  const filmsFromState = useAppSelector(getfilmListFromState);
  const incFilmsLength = useAppSelector(getMaxFilms);
  const minFilmsLength = useAppSelector(getMinFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      filmsFromState.length > minFilmsLength &&
      incFilmsLength >= filmsFromState.length
    ) {
      dispatch(loadMoreFilms(ButtonCondition.Blocked));
    }
  });

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => {
          dispatch(changeFilmsCount());
        }}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
