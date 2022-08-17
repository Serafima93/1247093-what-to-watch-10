import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTab } from '../../store/actions';
import { getTabFromState } from '../../store/films-process/selectors';

type TabMeaning = {
  tabMeaning: string;
};

function Tab(props: TabMeaning): JSX.Element {
  const { tabMeaning } = props;
  const tabFromState = useAppSelector(getTabFromState);
  const dispatch = useAppDispatch();

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
