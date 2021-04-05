import React, {useEffect} from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';

import './style.less';

export interface Props {
  isWaiting: boolean;
  messageData: any;
  onChecked: () => void;
  onWelcomed: () => void;
  t: (key) => string;
}

const Welcome = ({isWaiting, messageData, onChecked, onWelcomed, t}: Props) => {
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
  }, [messageData.type]);

  return (
    !isWaiting && (
      <div className="welcome">
        <img src="https://figmacn.com/handoff/welcome.png" />
        <h2 className="type type--pos-xlarge-bold">Heron Handoff</h2>
        <div className="welcome-introduction type type--pos-small-normal">
          {t('welcome title')}{' '}
          <a href={t('help link')} target="_blank">
            {t('learn more')}
          </a>
        </div>
        <button className="button button--primary" onClick={getFrames}>
          {t("let's go")}
        </button>
      </div>
    )
  );
};

export default withGlobalContextConsumer(withTranslation(Welcome));
