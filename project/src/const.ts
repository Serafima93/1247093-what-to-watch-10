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

export const ButtonCondition = {
  Unblocked: true,
  Blocked: false,
};

export enum FilmsCountForView {
  Min = 0,
  Max = 8,
  Step = 8,
  Similar = 4,
}

export enum TabsSections {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  PromoFilm = '/promo',
}

export enum NameSpace {
  Data = 'DATA',
  Film = 'FILM',
  User = 'USER',
  FilmFromServer = 'FILM_SERVER',
}

export const HeaderCondition = {
  Main: true,
  Film: false,
};

export const isCheckedAuth = (
  authorizationStatus: AuthorizationStatus
): boolean => authorizationStatus === AuthorizationStatus.Unknown;

export enum FavoriteFilm {
  OnServer = 0,
  NotOnServer = 1,
}

export enum CommentLength {
  MinLength = 50,
  MaxLength = 400,
}


