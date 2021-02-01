import React, {useState} from 'react';
import cn from 'classnames';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import Mark from './Mark';
import Library from './Library';
import Exportings from './Exportings';
import GeneratingModal from '@components/GeneratingModal';
import mixpanel from '@utils/mixpanel';
import './style.less';

const Settings = ({messageData, framesData, onFinished, globalData, changeGlobalData, t}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const backToSelector = () => {
    changeGlobalData('view', 'selector');
  };
  const showGeneratingModal = () => {
    mixpanel.track('Juuust Handoff', {Action: 'Start exporting'});
    setIsGenerating(true);
  };
  return (
    <>
      <div className={cn('settings', {'settings-visible': globalData.view === 'settings'})}>
        <div className="settings-header">
          <div className="type type--pos-large-bold">{t('settings title')}</div>
        </div>
        <div className="settings-blocks">
          <Mark />
          <Library />
          <Exportings />
        </div>
        <div className="settings-actions">
          <button className="button button--secondary" onClick={backToSelector}>
            {t('back')}
          </button>
          <button className="button button--primary" onClick={showGeneratingModal}>
            {t('start')}
          </button>
        </div>
      </div>
      {isGenerating && <GeneratingModal framesData={framesData} messageData={messageData} onFinished={onFinished} />}
    </>
  );
};

export default withGlobalContextConsumer(withTranslation(Settings, 'settings'));
