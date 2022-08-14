import { FilmStructure } from '../../types/films';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import FilmCardLittle from '../film-card/film-card-little';
import { useAppDispatch } from '../../hooks';
import { resetFilms, resetFilmsData } from '../../store/actions';
import { fetchFilmAction } from '../../store/api-actions';

type FilmCardProps = {
  filmCard: FilmStructure;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { filmCard } = props;
  const [userMouse, setUserMouse] = useState(filmCard);
  const [isVisibleFilmInfo, setVisibleFilmInfo] = useState(true);

  const handleMouseInter = () => {
    setUserMouse(userMouse);
    setTimeout(() => {
      setVisibleFilmInfo((prevState) => !prevState);
    }, 1000);
  };

  const handleFilmCardClick = () => {
    navigate(`/films/${filmCard.id}`);
    dispatch(resetFilmsData());
    dispatch(resetFilms());
    dispatch(fetchFilmAction(filmCard.id.toString()));
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseInter}
      onMouseLeave={() => {setVisibleFilmInfo(!isVisibleFilmInfo);}}
      onClick={handleFilmCardClick}
    >
      <div className="small-film-card__image">
        {isVisibleFilmInfo ? (
          <FilmCardLittle cardStructure={filmCard} />
        ) : (
          <VideoPlayer playerStructure={filmCard} />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/">
          {filmCard.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
