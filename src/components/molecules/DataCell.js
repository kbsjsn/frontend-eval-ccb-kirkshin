import React from 'react';
import './DataCell.scss';

export const DataCell = ({content}) => {
  return (
    <div className="cell-data">
      {content}
    </div>
  )
}