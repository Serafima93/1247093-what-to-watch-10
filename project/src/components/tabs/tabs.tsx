import { FilmStructure, FilmComment } from '../../types/films';
import Tab from '../tabs/tab-button';
import Details from './details';
import ReviewList from './reviews';
import Overview from './overview';
import { TabsSections} from '../../const';
import { useAppSelector } from '../../hooks';
import { gettabFromState } from '../../store/films-process/selectors';
import { getCommentsList } from '../../store/films-data/selectors';

type FilmProps = {
  filmExample: FilmStructure;
};

function Tabs(props: FilmProps): JSX.Element {
  const { filmExample } = props;

  const comments: FilmComment[] = useAppSelector(getCommentsList);
  const tabFromState = useAppSelector(gettabFromState);

  const tabsSectionsArray = Object.values(TabsSections);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabsSectionsArray.map((item) => (
            <Tab tabMeaning={item} key={item + 1} />
          ))}
        </ul>
      </nav>

      {tabFromState === TabsSections.Overview && <Overview filmExample={filmExample} />}
      {tabFromState === TabsSections.Details && (
        <Details detailedCardStructure={filmExample} />
      )}
      {tabFromState === TabsSections.Reviews &&
        comments.map((item) => (
          <ReviewList reviewExample={item} key={item.id} />
        ))}
    </div>
  );
}

export default Tabs;
