import React from 'react';
import './Icon.scss';

export const Icon = ({ src, title }) => (
  <img className="poster" alt={`poster of ${title}`} src={src} />
)