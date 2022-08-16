/* eslint-disable no-console */
import { useEffect } from 'react';
import { FilmStructure, Films } from '../../types/films';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addFavoriteFilmAction,
  fetchFavoriteFilmsAction,
} from '../../store/api-actions';
import { FavoriteFilmData } from '../../types/favorite-film-data';
import { getFavotiteFilms } from '../../store/films-data/selectors';
import { FavoriteFilm } from '../../const';

type ButtonsProps = {
  filmExample: FilmStructure;
};

function Buttons(props: ButtonsProps): JSX.Element {
  const { filmExample } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filmsFromServer = useAppSelector(getFavotiteFilms);
  let length = filmsFromServer.length;

  const [inList, setInList] = useState(filmExample.isFavorite);
  const [filmsCount, setfilmsCount] = useState(length);


  useEffect(() => {

    // Доделать число
    dispatch(fetchFavoriteFilmsAction());

  }, [dispatch]);


  const getFilmStatus = (films: Films) => {
    let filmsId: number[] = [];
    films.forEach((item: FilmStructure) => {
      filmsId.push(item.id);
    });
    filmsId = [...new Set(filmsId)];
    if (filmsId.includes(filmExample.id)) {
      return FavoriteFilm.OnServer;
    } else {
      return FavoriteFilm.NotOnServer;
    }
  };

  const onClick = (favoriteFilmData: FavoriteFilmData) => {
    dispatch(addFavoriteFilmAction(favoriteFilmData));
    if (inList === true) {
      console.log(inList);
      console.log(length++);
      setfilmsCount(length = length - 1);
      setInList(!inList);

    } else {
      console.log(inList);
      setfilmsCount(length = length + 1);
      console.log(length--);
      setInList(!inList);
    }
  };

  const handleSubmit = () => {
    const filmStatus = getFilmStatus(filmsFromServer);
    onClick({
      id: filmExample.id,
      status: filmStatus,
    });
  };

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
        onClick={handleSubmit}
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={`#${!inList ? 'add' : 'in-list'}`}></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">{filmsCount}</span>
      </button>
    </>
  );
}

export default Buttons;
