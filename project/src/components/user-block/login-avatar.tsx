import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function LoginAvatar(): JSX.Element {
  return (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">
        Sign in
      </Link>
    </div>
  );
}

export default LoginAvatar;
