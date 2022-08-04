/* eslint-disable no-console */
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main/main';
import Film from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import SingIn from '../../pages/sing-in/sing-in';
import AddReview from '../../pages/review/add-review';
import Player from '../../pages/player/player';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {
  getLoadedDataStatus,
  getallFilmsList,
} from '../../store/films-data/selectors';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getLoadedDataStatus);
  const allFilmsList = useAppSelector(getallFilmsList);

  if (isCheckedAuth(authorizationStatus) || isDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route
          path={AppRoute.Film}
          element={<Film filmsList={allFilmsList} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReview filmsList={allFilmsList} />}
        />
        <Route
          path={AppRoute.Login}
          element={<SingIn authorizationStatus={authorizationStatus} />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player filmsList={allFilmsList} />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList filmsStructure={allFilmsList} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
