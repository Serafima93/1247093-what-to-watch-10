import { FilmStructure } from '../../types/films';

type cardParameters = {
  filmCard: FilmStructure;
};

function FilmCardPoster(props: cardParameters): JSX.Element {
  const { filmCard } = props;

  return (
    <img
      src={filmCard.posterImage}
      alt={` ${filmCard.name} poster`}
      width="218"
      height="327"
    />
  );
}

export default FilmCardPoster;
