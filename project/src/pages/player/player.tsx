import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  getFilm,
  getLoadedDataStatusFilm,
} from '../../store/film-data/selectors';
import Spiner from '../../components/spiner/spiner';
import { fetchFilmAction } from '../../store/api-actions';
import dayjs from 'dayjs';

function Player(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const filmExample = useAppSelector(getFilm);
  const isDataLoadingFilm = useAppSelector(getLoadedDataStatusFilm);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    dispatch(fetchFilmAction(id as string));
  }, [dispatch, id]);

  const getTimeLeft = (currentTime: number, runTime: number): void => {
    const currentTimeLeft = (runTime - currentTime) * 1000;
    let timeLeftFormat = 'hh:mm:ss';
    if (currentTimeLeft < 3600000) {
      timeLeftFormat = 'mm:ss';
    }
    setTimeLeft(dayjs(currentTimeLeft).format(timeLeftFormat));
  };

  if (isDataLoadingFilm) {
    return <Spiner />;
    // Добавить обработку ошибок
  }

  const handleButtonExit = () => {
    setIsPlaying(false);
    navigate('/');
  };

  const handleVideoTimeUpdate = (
    evt: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    if (videoRef.current !== null) {
      setCurrentPosition(
        Number((videoRef.current.currentTime * 100) / videoRef.current.duration)
      );
      getTimeLeft(videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  const handleButtonFullScreen = () => {
    if (videoRef.current !== null) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="player">
      <video
        muted
        src={filmExample.videoLink}
        className="player__video"
        poster={filmExample.previewImage}
        ref={videoRef}
        onTimeUpdate={handleVideoTimeUpdate}
      >
      </video>
      <button type="button" className="player__exit" onClick={handleButtonExit}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              ref={progressRef}
              className="player__progress"
              value="0"
              max="100"
            >
            </progress>
            <div
              className="player__toggler"
              style={{ left: `${currentPosition}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
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
              onClick={handleButtonFullScreen}
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
