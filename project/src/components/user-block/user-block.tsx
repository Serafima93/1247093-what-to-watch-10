import { Link, useNavigate } from 'react-router-dom';
import {
  logoutAction,
  fetchFavoriteFilmsAction,
} from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div
          className="user-block__avatar"
          onClick={() => {
            navigate(AppRoute.MyList);
            dispatch(fetchFavoriteFilmsAction());
          }}
        >
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          className="user-block__link"
          // Лучше объявить отдельную функцию внутри UserBlock, и здесь ее по имени указать, а не объявлять на месте
          // не очень поняла, что имеется ввиду
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to="/"
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;
