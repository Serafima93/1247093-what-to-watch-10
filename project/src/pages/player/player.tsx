import { FilmStructure } from '../../types/films';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { getAllFilmsList } from '../../store/films-data/selectors';
import { getTimeFromMins } from '../../utils';

function Player(): JSX.Element {
  const filmsList = useAppSelector(getAllFilmsList);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();
  const params = useParams();

  // такой же как и в ревью вопрос.Делаем плеера из списка фильмов или же по запросу.
  const filmExample = filmsList.find(
    (item) => item.id === Number(params.id)
  ) as FilmStructure;

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));
    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  const runTime = getTimeFromMins(filmExample.runTime);

  return (
    <div className="player">
      <video
        autoPlay
        muted
        src={filmExample.videoLink}
        className={`${isFullScreen ? 'player__video' : ''}`}
        poster={filmExample.previewImage}
        ref={videoRef}
      >
      </video>
      <button
        type="button"
        className="player__exit"
        onClick={() => {
          setIsPlaying(false);
          navigate('/');
        }}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value="0"
              max="100"
            >
            </progress>
            <div className="player__toggler" style={{ left: '0%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{runTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" disabled={isLoading}>
            <svg
              viewBox="0 0 19 19"
              width="19"
              height="19"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <use xlinkHref={`#${isPlaying ? 'pause' : 'play-s'}`}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg
              viewBox="0 0 27 27"
              width="27"
              height="27"
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
