/* eslint-disable no-console */
import { FilmComment } from '../../types/films';

type UserReviewsProps = {
  reviewExample: FilmComment;
};

function ReviewList(props: UserReviewsProps): JSX.Element {
  const { reviewExample } = props;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {reviewExample.comment}
        </p>

        <footer className="review__details">
          <cite className="review__author"> {reviewExample.user.name}</cite>
          <time className="review__date" dateTime={reviewExample.date}>
            {reviewExample.date}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{reviewExample.rating}</div>
    </div>
  );
}

export default ReviewList;
