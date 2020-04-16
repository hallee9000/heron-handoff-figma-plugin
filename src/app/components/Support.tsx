import * as React from 'react';
import cn from 'classnames';

import './support.less';

export interface Props {
    visible: boolean;
    onClose: () => void;
}

export default ({visible, onClose}) => (
    <div className={cn('support', {hide: !visible})}>
        <h2 className="type type--pos-xlarge-bold">Buy Me a Coffee</h2>
        <img src="https://figmacn.com/handoff/qrcode.jpg" />
        <div className="type type--pos-small-normal">Or</div>
        <a
            href="https://paypal.me/leadream"
            target="_blank"
            rel="noopener noreferrer"
            className="type type--pos-small-bold"
        >
            Support by PayPal
        </a>
        <button className="button button--secondary" onClick={onClose}>
            Close
        </button>
    </div>
);
