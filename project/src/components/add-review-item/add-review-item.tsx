import React from 'react';
import { useState, ChangeEvent } from 'react';
import { ratingStars } from '../../const';
import { FilmStructure } from '../../types/films';

type AddReviewItemProps = {
  filmExample: FilmStructure;
};

function AddReviewForm(props: AddReviewItemProps): JSX.Element {
  const { filmExample } = props;
  const [userReview, setUserReview] = useState('Review text');
  const [userRating, setRating] = useState(0);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
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
                  onChange={(evt) => setRating(Number(evt.target.value))}
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
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder={userReview}
            onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
              const value = target.value;
              setUserReview(value);
            }}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
