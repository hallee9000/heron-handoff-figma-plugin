import * as React from 'react';
import cn from 'classnames';
import {Twitter, Wechat} from './icons';

import './support.less';

export interface Props {
  visible: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

export default ({visible, isSuccess, onClose}) => (
  <div className={cn('support', {hide: !visible})}>
    {isSuccess && <h2 className="type type--pos-xlarge-bold">🎉Congratulations!</h2>}
    <div className="type type--pos-medium-normal">Share this plugin to your friends</div>
    <div className="support-social">
      <a
        href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.figma.com%2Fcommunity%2Fplugin%2F830051293378016221%2FJuuust-Handoff&text=Check+out+Juuust+Handoff+by+Jun+%E2%80%94+a+free+plugin+on+%40figmadesign%3A"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter size={24} />
      </a>
      <a href="javascript:;" rel="noopener noreferrer">
        <Wechat size={24} />
        <div className="social-wechat">
          <img src={require('../assets/landing.png')} />
        </div>
      </a>
    </div>
    <div className="type type--pos-medium-normal">Or buy Me a Coffee</div>
    <img src="https://figmacn.com/handoff/qrcode.jpg" />
    <a
      href="https://paypal.me/leadream"
      target="_blank"
      rel="noopener noreferrer"
      className="type type--pos-small-bold"
    >
      Support by PayPal
    </a>
    <br />
    <br />
    <div className="type type--pos-medium-normal">Thanks</div>
    <button className="button button--secondary" onClick={onClose}>
      Close
    </button>
  </div>
);
