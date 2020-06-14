import * as React from 'react';
import cn from 'classnames';
import {LangContext} from '@lang/lang-context';
import {Twitter, Wechat, Copy} from '@components/icons';
import {copySomething} from '@utils/helper';

import './style.less';

export interface Props {
  visible: boolean;
  onClose: () => void;
}

export default ({visible, onClose}) => {
  const [copyVisible, setCopyVisible] = React.useState(false);

  const copyLink = () => {
    copySomething('https://figmacn.com/handoff-landing', () => setCopyVisible(true));
    setTimeout(() => setCopyVisible(false), 1000);
  };

  return (
    <LangContext.Consumer>
      {langData => (
        <div className={cn('support', {active: visible})}>
          <h2 className="type type--pos-xlarge-bold">🎉{langData['support title']}</h2>
          <div className="support-social">
            <a
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.figma.com%2Fcommunity%2Fplugin%2F830051293378016221%2FJuuust-Handoff&text=Check+out+Juuust+Handoff+by+Jun+%E2%80%94+a+free+plugin+on+%40figmadesign%3A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={24} />
            </a>
            <a href="javascript:;">
              <Wechat size={24} />
              <div className="social-wechat">
                <img src={require('@assets/landing.png')} />
              </div>
            </a>
            <a href="javascript:;" onClick={copyLink}>
              <Copy size={24} />
              <div className={cn('social-copy', {'social-copy-visible': copyVisible})}>{langData['copied']}</div>
            </a>
          </div>
          <div className="type type--pos-medium-normal">{langData['or buy coffee']}</div>
          <img src="https://figmacn.com/handoff/qrcode.jpg" />
          <a
            href="https://paypal.me/leadream"
            target="_blank"
            rel="noopener noreferrer"
            className="type type--pos-small-bold"
          >
            {langData['paypal']}
          </a>
          <br />
          <br />
          <div className="type type--pos-medium-normal">{langData['thanks']}</div>
          <button className="button button--secondary" onClick={onClose}>
            {langData['close']}
          </button>
        </div>
      )}
    </LangContext.Consumer>
  );
};
