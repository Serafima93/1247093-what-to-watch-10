import { Link, useNavigate } from 'react-router-dom';
import { FilmStructure } from '../../types/films';
import Videoplayer from '../video-player/video-player';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { resetFilms, resetFilmsData } from '../../store/actions';
import { fetchFilmAction } from '../../store/api-actions';

type FilmCardProps = {
  filmCard: FilmStructure;
};

function FilmCard({ filmCard }: FilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [activeCard, setActiveCard] = useState({});
  const isPlaying = filmCard === activeCard;
  const navigate = useNavigate();
  let timer: ReturnType<typeof setTimeout>;

  const handleMouseInter = () => {
    timer = setTimeout(() => {
      setActiveCard(filmCard);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setActiveCard({});
  };

  const handleArticleFilmCardClick = () => {
    navigate(`/films/${filmCard.id}`);
    dispatch(resetFilmsData());
    dispatch(resetFilms());
    dispatch(fetchFilmAction(filmCard.id.toString()));
  };

  return (
    <article
      style={{ cursor: 'pointer' }}
      onClick={handleArticleFilmCardClick}
      onMouseEnter={handleMouseInter}
      onMouseLeave={handleMouseLeave}
      className="small-film-card catalog__films-card"
    >
      <Videoplayer isPlaying={isPlaying} playerStructure={filmCard} />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/">
          {filmCard.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
