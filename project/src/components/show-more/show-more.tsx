/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilmsCount, loadMoreFilms } from '../../store/actions';
import { ButtonCondition } from '../../const';
import { useEffect } from 'react';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsFromState = useAppSelector((state) => state.filmListFromState);

  const incFilmsLength = useAppSelector((state) => state.MaxFilms);
  const minFilmsLength = useAppSelector((state) => state.MinFilms);

  //насчет зависимостей, у меня линтер начинает орать
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
