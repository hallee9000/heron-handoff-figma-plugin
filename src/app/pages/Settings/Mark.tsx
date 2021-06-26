import React from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {Docs} from '@components/icons';
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

  function handleChange(e) {
    const {name, value} = e.target;
    const changedSettings: any = {};
    if (name === 'platform') {
      const currentPlatform = value - 0;
      const unitRange = unitMaps[currentPlatform];
      if (unitRange.indexOf(unit) < 0) {
        // unit = unitRange[0]
        changeGlobalData('unit', unitRange[0]);
        changedSettings.unit = unitRange[0];
      }
      resetResolution(currentPlatform, changedSettings);
    }
    changedSettings[name] = Math.floor(value - 0); // avoid decimals when remBase
    changeGlobalData(changedSettings);
    changeSettingsAndNotifyBackground(globalData, changedSettings);
  }

  function resetResolution(platform, changedSettings) {
    const defaultResolution = platform === 2 ? 1 : 0;
    changeGlobalData('resolution', defaultResolution);
    changedSettings.resolution = defaultResolution;
  }

  function getMarkSize() {
    const scale = resolutions[platform][resolution].value;
    const num = (80 * scale) / (baseVisible ? remBase : 1);
    return (num === Math.floor(num) ? num : num.toFixed(2)) + UNITS[unit];
  }

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
              {resolution.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item form-item-helper">
        <label className="label" />
        <a
          className="helper"
          href="https://docs.heron.design/designer/#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E9%80%89%E4%BA%86-2x-%E6%A0%87%E6%B3%A8%E5%8F%98%E6%88%90%E4%B8%80%E5%8D%8A%E4%BA%86"
          target="_blank"
        >
          {t('resolution explanation').replace('{num}', getMarkSize())}
          <Docs size={12} />
        </a>
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
