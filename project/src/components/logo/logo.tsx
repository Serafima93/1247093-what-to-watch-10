import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { resetFilms } from '../../store/actions';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="logo">
      <Link
        className="logo__link"
        to={AppRoute.Main}
        onClick={() => {
          dispatch(resetFilms());
        }}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
