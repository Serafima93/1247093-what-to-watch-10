export enum AppRoute {
  Login = '/login',
  Film = '/films/:id',
  MyList = '/myList',
  Main = '/',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ratingStars: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
