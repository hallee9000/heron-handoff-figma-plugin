import React from 'react';
import cn from 'classnames';

import './style.less';

const Modal = function({isOpen, onClose, children}) {
  return (
    <div className={cn('modal', {'modal-visible': isOpen})}>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
