import React from 'react';

export default ({children, id, ...props}) => (
  <div className="checkbox">
    <input type="checkbox" id={id} className="checkbox__box" {...props} />
    <label className="checkbox__label" htmlFor={id}>
      {children}
    </label>
  </div>
);
