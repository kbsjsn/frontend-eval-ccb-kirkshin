import React from 'react';
import './DataCell.scss';

export const DataCellBarChart = ({content}) => {
  return (
    <div className="cell-data .container-chart">
      <div className="chart" style={{width: `${(content / 10) * 100}%`}}>

      </div>
    </div>
  )
}