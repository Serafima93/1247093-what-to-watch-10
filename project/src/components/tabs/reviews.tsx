import { FilmComment } from '../../types/films';
import dayjs from 'dayjs';

type UserReviewsProps = {
  reviewExample: FilmComment;
};

function ReviewList(props: UserReviewsProps): JSX.Element {
  const { reviewExample } = props;

  const date = dayjs(reviewExample.date);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviewExample.comment}</p>

            <footer className="review__details">
              <cite className="review__author"> {reviewExample.user.name}</cite>
              <time className="review__date" dateTime={date.toISOString()}>
                {`${date.format('MMMM DD')}, ${date.format('YYYY')}`}
              </time>
            </footer>
          </blockquote>
          <div className="review__rating">{reviewExample.rating}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
