export function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}:${minutes}`;
}

export const getFilmRating = (rating: number) => {
  if (rating === 10) {
    return 'Awesome';
  }
  if (rating > 8) {
    return 'Very good';
  }
  if (rating > 5) {
    return 'Good';
  }
  if (rating > 3) {
    return 'Normal';
  }
  return 'Bad';
};
