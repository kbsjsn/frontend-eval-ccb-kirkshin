import React from 'react';
import { SmallHeader } from '../atoms/SmallHeader';
import './HeaderCell.scss';

const modifySort = (heading) => (
  heading.toLowerCase().replace(/ /gi, '_')
)

export const HeaderCell = ({content, src, sortField, sortOrder, sortBy, toggleSortOrder }) => {
  const snakeCaseHeading = modifySort(content);

  let sortIcon;
  if (snakeCaseHeading === sortField) {
    if (sortOrder) { // true -> in-order sort, false -> reverse-order sort
      sortIcon = '▲'
    }
    else {
      sortIcon = '▼';
    }
  }

  function handleClick () {
    if (snakeCaseHeading === sortField) {
      toggleSortOrder();
    }
    else {
      sortBy(snakeCaseHeading)
    }
  }

  return (
    sortBy ? 
      // header of movie table
        <div className="cell-header table-heading" onClick={handleClick}>
          <div className="table-heading-container">
            <SmallHeader text={content} />
            {
              sortIcon && <span className="sort-icon">{sortIcon}</span>
            }
          </div>
        </div>
    :
      // movie title in each row
      <div className="cell-header" >
        <SmallHeader text={content} />
      </div>
  )
}