import { FilmRatingInWords } from './const';

export function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}:${minutes}`;
}

export const getFilmRating = (rating: number) => {
  if (rating === 10) {
    return FilmRatingInWords.Awesome;
  }
  if (rating > 8) {
    return FilmRatingInWords.VeryGood;
  }
  if (rating > 5) {
    return FilmRatingInWords.Good;
  }
  if (rating > 3) {
    return FilmRatingInWords.Normal;
  }
  return FilmRatingInWords.Bad;
};
