import React from 'react';
import { Close } from './Icons';

export const Badge = ({ label, handleClick }) => (
  <div className="c-token">
    <span className="c-label">{label}</span>
    <span className="c-remove" onClick={(e) => handleClick(e)}>
      <Close width={15} height={15} />
    </span>
  </div>
)