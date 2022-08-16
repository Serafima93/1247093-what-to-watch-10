import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import AddReviewForm from '../../components/add-review-item/add-review-item';
import UserBlock from '../../components/user-block/user-block';
import LoginAvatar from '../../components/user-block/login-avatar';
import FilmCardPoster from '../../components/film-card/film-card-poster';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Spiner from '../../components/spiner/spiner';
import { AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getLoadedDataStatusFilm } from '../../store/film-data/selectors';
import { getFilm } from '../../store/film-data/selectors';
import { fetchFilmAction } from '../../store/api-actions';

function AddReview(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoadingFilm = useAppSelector(getLoadedDataStatusFilm);
  const filmExample = useAppSelector(getFilm);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFilmAction(id as string));
  }, [dispatch, id]);

  if (isDataLoadingFilm) {
    return <Spiner />;
    // Добавить обработку ошибок
  }

  return (
    <section
      className="film-card film-card--full"
      style={{ background: filmExample.backgroundColor }}
    >
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
