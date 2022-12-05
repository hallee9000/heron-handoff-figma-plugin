import React from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import {Home, Docs, MessageCircle, Coffee, Globe} from '@components/icons';

import './footer.less';

export interface Props {
  globalData: any;
  changeGlobalData: (property, value) => void;
  messageData: any;
  isWelcomed: boolean;
  onSupportClick: () => void;
}

const Footer = ({globalData, changeGlobalData, isWelcomed, onSupportClick, t}) => {
  const {language} = globalData;
  const changeLanguage = e => {
    const lang = e.target.value;
    changeGlobalData('language', lang);
    changeSettingsAndNotifyBackground(globalData, {language: lang});
  };

  return (
    <div className="app-footer">
      <a className="type type--pos-small-normal" href={t('help link')} target="_blank" title={t('docs')}>
        <Docs size={16} /> {t('visit docs')}
      </a>
      <a
        className="type type--pos-small-normal"
        href="https://docs.heron.design/zh-CN/handoff/designer"
        target="_blank"
        title={t('feedback')}
      >
        <MessageCircle size={16} /> {t('feedback')}
      </a>
      <div className="stretched-box" />
      <a href="https://heron.design" target="_blank" title={t('docs')}>
        <Home size={16} />
      </a>
      {isWelcomed && (
        <span title={t('buy coffee')} onClick={onSupportClick}>
          <Coffee size={16} />
        </span>
      )}
      <span title="Change language">
        <select onChange={changeLanguage} value={language}>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
        <Globe size={16} />
      </span>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(Footer));
