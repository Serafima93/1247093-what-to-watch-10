import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ratingStars, CommentLength } from '../../const';
import { FilmStructure } from '../../types/films';
import { useAppDispatch } from '../../hooks';
import { addCommentAction } from '../../store/api-actions';
import { CommentData } from '../../types/comment-data';
import ErrorMessage from '../error-message/error-message';

type AddReviewItemProps = {
  filmExample: FilmStructure;
};

function AddReviewForm(props: AddReviewItemProps): JSX.Element {
  const { filmExample } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userReview, setUserReview] = useState('Review text');
  const [userRating, setRating] = useState(0);

  const isMessageEntered =
    userReview.length >= CommentLength.MinLength &&
    userReview.length <= CommentLength.MaxLength;

  const isRatingSelected = userRating !== 0;
  const formSentCondition = isMessageEntered && isRatingSelected;


  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setUserReview(value);
  };

  const onSubmit = (formData: CommentData) => {
    dispatch(addCommentAction(formData));
    navigate(`/films/${filmExample.id}`);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formSentCondition) {
      onSubmit({
        comment: userReview,
        rating: userRating,
        id: filmExample.id,
      });
    } else {
      <ErrorMessage />;
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {ratingStars.map((id) => (
              <React.Fragment key={id + filmExample.name}>
                <input
                  className="rating__input"
                  id={`star-${id}`}
                  type="radio"
                  name="rating"
                  value={id}
                  checked={id === userRating}
                  onChange={handleRatingChange}
                />
                <label className="rating__label" htmlFor={`star-${id}`}>
                  {`Rating-${id}`}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            minLength={CommentLength.MinLength}
            maxLength={CommentLength.MaxLength}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder={userReview}
            onChange={handleReviewChange}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              style={{
                opacity: formSentCondition ? '1' : '0.4',
                pointerEvents: formSentCondition ? 'auto' : 'none',
              }}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
