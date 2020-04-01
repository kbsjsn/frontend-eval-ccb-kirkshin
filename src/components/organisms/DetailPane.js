import React from 'react';
import './DetailPane.scss';

export const DetailPane = ({ children, isSelected, closePane }) => (
  <div className={isSelected ? 'detail-pane' : 'detail-pane-closed'} >
    <button className="button-close-pane" onClick={closePane}>X</button>
    {children}
  </div>
);