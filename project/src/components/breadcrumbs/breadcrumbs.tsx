/* eslint-disable no-console */

import { FilmStructure } from '../../types/films';
import { Link } from 'react-router-dom';
import React from 'react';

type BreadcrumbsProps = {
  filmExample: FilmStructure;
};

function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  const { filmExample } = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${filmExample.id}`} className="breadcrumbs__link">
            {filmExample.name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Breadcrumbs);
