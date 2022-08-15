import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getTimeFromMins } from '../../utils';
import {
  getFilm,
  getLoadedDataStatusFilm,
} from '../../store/films-data/selectors';
import Spiner from '../../components/spiner/spiner';
import { fetchFilmAction } from '../../store/api-actions';

function Player(): JSX.Element {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const filmExample = useAppSelector(getFilm);
  const isDataLoadingFilm = useAppSelector(getLoadedDataStatusFilm);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(fetchFilmAction(id as string));
  }, [dispatch, id]);

  if (isDataLoadingFilm) {
    return <Spiner />;
    // Добавить обработку ошибок
  }

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
