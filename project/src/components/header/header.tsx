import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import LoginAvatar from '../user-block/login-avatar';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  return (
    <header
      className={
        authorizationStatus !== AuthorizationStatus.Auth
          ? 'page-header'
          : 'page-header film-card__head'
      }
    >
      <Logo />
      {authorizationStatus !== AuthorizationStatus.Auth ? (
        <LoginAvatar />
      ) : (
        <UserBlock />
      )}
    </header>
  );
}

export default Header;
