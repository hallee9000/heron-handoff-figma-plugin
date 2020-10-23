import React, {useState, useEffect} from 'react';
import {LangContext} from '@lang/lang-context';
import {Docs, Coffee, Globe} from '@components/icons';

import './footer.less';

export interface Props {
  messageData: any;
  onLangChange: () => void;
  onSupportClick: () => void;
}

export default ({messageData, onLangChange, onSupportClick}) => {
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:language-got') {
      const {language} = message;
      if (language && ['en', 'zh'].indexOf(language) > -1) {
        setLang(language);
        onLangChange(language);
      }
    }
  }, [messageData.type]);

  const changeLanguage = e => {
    const lang = e.target.value;
    setLang(lang);
    onLangChange(lang);
    parent.postMessage({pluginMessage: {type: 'ui:set-language', language: lang}}, '*');
  };

  return (
    <LangContext.Consumer>
      {langData => (
        <div className="app-footer">
          <span title="Change language">
            <select onChange={changeLanguage} value={lang}>
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
            <Globe size={16} />
          </span>
          <a href={langData['help link']} target="_blank" title={langData['docs']}>
            <Docs size={16} />
          </a>
          <span title={langData['buy coffee']} onClick={onSupportClick}>
            <Coffee size={16} />
          </span>
        </div>
      )}
    </LangContext.Consumer>
  );
};
