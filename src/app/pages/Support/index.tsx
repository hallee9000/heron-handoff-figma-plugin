import * as React from 'react';
import cn from 'classnames';
import {withTranslation} from '@app/context';
import {Twitter, Wechat, Copy} from '@components/icons';
import {copySomething} from '@utils/helper';

import qrcode from '@assets/qrcode.png';
import './style.less';

export interface Props {
  visible: boolean;
  onClose: () => void;
  t: (key) => string;
}

const Support = ({visible, onClose, t}: Props) => {
  const [copyVisible, setCopyVisible] = React.useState(false);

  const copyLink = e => {
    e.preventDefault();
    copySomething('https://heronhq.com', () => setCopyVisible(true));
    setTimeout(() => setCopyVisible(false), 1000);
  };

  return (
    <div className={cn('support', {active: visible})}>
      <h2 className="type type--pos-xlarge-bold">{t('share')}</h2>
      <div className="support-social">
        <a
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.figma.com%2Fcommunity%2Fplugin%2F830051293378016221%Heron-Handoff&text=Check+out+Heron+Handoff+by+Jun+%E2%80%94+a+free+plugin+on+%40figmadesign%3A"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter size={24} />
        </a>
        <a href="#" onClick={e => e.preventDefault()}>
          <Wechat size={24} />
          <div className="social-wechat">
            <img src={require('@assets/landing.png')} />
          </div>
        </a>
        <a href="#" onClick={copyLink}>
          <Copy size={24} />
          <div className={cn('social-copy', {'social-copy-visible': copyVisible})}>{t('copied')}</div>
        </a>
      </div>
      <h2 className="type type--pos-xlarge-bold">{t('support')}</h2>
      {visible && (
        <div className="pay-qrcode">
          <img src={qrcode} alt="Payment QRCode" />
        </div>
      )}
      <a
        href="https://www.buymeacoffee.com/hal__lee"
        target="_blank"
        rel="noopener noreferrer"
        className="type type type--pos-xlarge-bold"
      >
        {t('or buy me a coffee')}
      </a>
      <br />
      <br />
      <div className="type type--pos-medium-normal">{t('thanks')}</div>
      <button className="button button--secondary" onClick={onClose}>
        {t('close')}
      </button>
    </div>
  );
};

export default withTranslation(Support);
