import React from 'react';
import './TableRow.scss';

export const TableRow = ({ children, onComponentClick }) => (
    <div className="table-row" onClick={onComponentClick}>
      {children}
    </div>
  )
