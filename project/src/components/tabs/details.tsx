import { FilmStructure } from '../../types/films';
import { getTimeFromMins } from '../../utils';

type detailedCardParameters = {
  detailedCardStructure: FilmStructure;
};

function Details(props: detailedCardParameters): JSX.Element {
  const { detailedCardStructure } = props;

  const actors = detailedCardStructure.starring
    .slice()
    .map((item) => `${item}, `);

  return (
    <>
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">
              {detailedCardStructure.director}
            </span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {actors} <br></br>
            </span>
          </p>
        </div>

        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">
              {getTimeFromMins(detailedCardStructure.runTime)}
            </span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value">
              {detailedCardStructure.genre}
            </span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">
              {detailedCardStructure.released}
            </span>
          </p>
        </div>
      </div>
      {}
    </>
  );
}

export default Details;
