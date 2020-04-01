import React from 'react';
import './SmallHeader.scss';

export const SmallHeader = ({text}) => {
  return (
    <strong className="small-header">{text}</strong>
  )
}