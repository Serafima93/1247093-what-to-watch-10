/* eslint-disable no-console */
import Logo from '../../components/logo/logo';
import AddReviewForm from '../../components/add-review-item/add-review-item';
import UserBlock from '../../components/user-block/user-block';
import LoginAvatar from '../../components/user-block/login-avatar';
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
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">
                  {filmExample.name}
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <UserBlock />
          ) : (
            <LoginAvatar />
          )}
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={filmExample.posterImage}
            alt={` ${filmExample.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>
      <AddReviewForm filmExample={filmExample} />
    </section>
  );
}

export default AddReview;
