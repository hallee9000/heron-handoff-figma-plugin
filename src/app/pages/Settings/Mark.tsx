import React from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import {PLATFORMS, WEB_MULTIPLE, IOS_DENSITY, ANDROID_DENSITY, UNITS} from '@app/constants';

const resolutions = [WEB_MULTIPLE, IOS_DENSITY, ANDROID_DENSITY];
const unitMaps = [[2, 3, 4, 5], [0, 2], [1, 2]]; // [Web, iOS, Android]

function getUnits(platform) {
  return unitMaps[platform].map(index => ({label: UNITS[index], value: index}));
}

const Mark = ({globalData, changeGlobalData, t}) => {
  const {platform, resolution, unit, remBase} = globalData;
  const baseVisible = platform === 0 && (unit === 3 || unit === 4);
  const units = getUnits(platform);
  const handleChange = e => {
    const {name, value} = e.target;
    const changedSettings: any = {};
    if (name === 'platform') {
      const currentPlatform = value - 0;
      const unitRange = unitMaps[currentPlatform];
      const resolutionRange = resolutions[currentPlatform];
      if (unitRange.indexOf(unit) < 0) {
        // unit = unitRange[0]
        changeGlobalData('unit', unitRange[0]);
        changedSettings.unit = unitRange[0];
      }
      if (!resolutionRange[resolution]) {
        // resolution = 0
        changeGlobalData('resolution', 0);
        changedSettings.resolution = 0;
      }
    }
    changedSettings[name] = Math.floor(value - 0); // avoid decimals when remBase
    changeGlobalData(changedSettings);
    changeSettingsAndNotifyBackground(globalData, changedSettings);
  };
  return (
    <div className="settings-block">
      <div className="section-title type type--pos-medium-bold">{t('mark')}</div>
      <div className="form-item">
        <label className="label">{t('platform')}</label>
        <select name="platform" className="select" value={platform} onChange={handleChange}>
          {PLATFORMS.map((platform, index) => (
            <option value={index} key={index}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label className="label">{t(platform === 0 ? 'multiple' : 'pixel density')}</label>
        <select name="resolution" className="select" value={resolution} onChange={handleChange}>
          {resolutions[platform].map((resolution, index) => (
            <option value={index} key={index}>
              {resolution}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label className="label">{t('unit')}</label>
        <select name="unit" className="select" value={unit} onChange={handleChange}>
          {units.map(({label, value}) => (
            <option value={value} key={value}>
              {label}
              {label === 'rpx' && ` (${t('wechat mini program')})`}
            </option>
          ))}
        </select>
      </div>
      {baseVisible && (
        <div className="form-item">
          <label className="label">{t('rem base')}</label>
          <input name="remBase" type="number" className="input" value={remBase} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(Mark, 'settings'));
