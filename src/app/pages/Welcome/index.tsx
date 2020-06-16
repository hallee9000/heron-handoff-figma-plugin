import React, {useEffect} from 'react';
import cn from 'classnames';
import {LangContext} from '@lang/lang-context';
import mixpanel from '@utils/mixpanel';

import './style.less';

export interface Props {
  messageData: any;
  onChecked: () => void;
  onWelcomed: () => void;
}

export default ({messageData, onChecked, onWelcomed}) => {
  const getFrames = () => {
    onWelcomed();
    parent.postMessage({pluginMessage: {type: 'ui:set-welcomed'}}, '*');
    parent.postMessage({pluginMessage: {type: 'ui:get-frames'}}, '*');
  };

  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:check-welcome') {
      onChecked();
      if (message.isWelcomed) {
        onWelcomed();
        parent.postMessage({pluginMessage: {type: 'ui:get-frames'}}, '*');
      }
    }
    if (type === 'bg:mixpanel-user') {
      const {userId} = message;
      mixpanel.identify(userId);
    }
  }, [messageData.type]);

  return (
    <LangContext.Consumer>
      {langData => (
        <div className={cn('welcome')}>
          <img src="https://figmacn.com/handoff/welcome.png" />
          <h2 className="type type--pos-xlarge-bold">Juuust Handoff</h2>
          <div className="welcome-introduction type type--pos-small-normal">
            {langData['welcome title']}{' '}
            <a href={langData['help link']} target="_blank">
              {langData['learn more']}
            </a>
          </div>
          <button className="button button--primary" onClick={getFrames}>
            {langData['next step']}
          </button>
        </div>
      )}
    </LangContext.Consumer>
  );
};
