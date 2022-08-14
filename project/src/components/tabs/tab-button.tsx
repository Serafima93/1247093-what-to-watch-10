/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTab } from '../../store/actions';
import { getTabFromState } from '../../store/films-process/selectors';

type TabMeaning = {
  tabMeaning: string;
};

function Tab(props: TabMeaning): JSX.Element {
  const { tabMeaning } = props;
  const dispatch = useAppDispatch();
  const tabFromState = useAppSelector(getTabFromState);

  return (
    <>
      <li
        className={
          tabMeaning === tabFromState
            ? 'film-nav__item film-nav__item--active'
            : 'film-nav__item'
        }
      >
        <a
          // href="#"
          className="film-nav__link"
          onClick={() => {
            dispatch(changeTab(tabMeaning));
          }}
        >
          {tabMeaning}
        </a>
      </li>
      {}
    </>
  );
}

export default Tab;
