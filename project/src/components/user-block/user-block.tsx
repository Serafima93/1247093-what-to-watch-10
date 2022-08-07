import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
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
