/* eslint-disable no-console */
import Logo from '../../components/logo/logo';
import AddReviewForm from '../../components/add-review-item/add-review-item';
import UserBlock from '../../components/user-block/user-block';
import LoginAvatar from '../../components/user-block/login-avatar';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { FilmStructure } from '../../types/films';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getallFilmsList } from '../../store/films-data/selectors';

function AddReview(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const allFilmListFromState = useAppSelector(getallFilmsList);

  const params = useParams();
  const filmExample = allFilmListFromState.find(
    (item) => item.id === Number(params.id)
  ) as FilmStructure;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmExample.previewImage} alt={filmExample.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <Breadcrumbs filmExample={filmExample} />

          {authorizationStatus === AuthorizationStatus.Auth ? (
            <UserBlock />
          ) : (
            <LoginAvatar />
          )}
        </header>

        <div className="film-card__poster film-card__poster--small">
          <FilmCardPoster filmCard={filmExample} />
        </div>
      </div>
      <AddReviewForm filmExample={filmExample} />
    </section>
  );
}

export default AddReview;
