import { useEffect, useRef } from 'react';
import { FilmStructure } from '../../types/films';

type MoviePlayerProps = {
  playerStructure: FilmStructure;
  isPlaying: boolean;
};

function Videoplayer(props: MoviePlayerProps): JSX.Element {
  const { playerStructure, isPlaying } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current?.play();
      return;
    }
    videoRef.current.load();
  }, [isPlaying]);

  return (
    <div className="small-film-card__image">
      <video
        src={playerStructure.previewVideoLink}
        poster={playerStructure.previewImage}
        muted
        autoPlay={isPlaying}
        ref={videoRef}
        width="280"
        height="175"
      />
    </div>
  );
}

export default Videoplayer;
