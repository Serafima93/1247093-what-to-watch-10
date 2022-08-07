import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import LoginAvatar from '../user-block/login-avatar';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { FilmStructure } from '../../types/films';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type HeaderProps = {
  filmCard: FilmStructure;
};

function Header(props: HeaderProps): JSX.Element {
  const { filmCard } = props;

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const checkStatus = authorizationStatus !== AuthorizationStatus.Auth;

  return (
    <>
      <div className="film-card__bg">
        <img
          src={checkStatus ? 'img/bg-header.jpg' : filmCard.backgroundImage}
          alt={filmCard.name}
        />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <header
        className={checkStatus ? 'page-header' : 'page-header film-card__head'}
      >
        <Logo />
        {checkStatus ? <LoginAvatar /> : <UserBlock />}
      </header>
    </>
  );
}

export default Header;
