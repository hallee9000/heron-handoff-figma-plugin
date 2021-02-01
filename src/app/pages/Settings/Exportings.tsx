import React from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import Checkbox from '@components/Checkbox';
import {NAMING_CONVENTION, CONVENTION_IMAGES_EXAMPLES} from '@app/constants';

const Settings = ({globalData, changeGlobalData, t}) => {
  const handleChange = e => {
    const {type, name, value, checked} = e.target;
    const numericValue = type === 'checkbox' ? checked : value - 0;
    changeGlobalData(name, numericValue);
    changeSettingsAndNotifyBackground(globalData, {[name]: numericValue});
  };
  return (
    <div className="settings-block">
      <div className="section-title type type--pos-medium-bold">{t('exported images')}</div>
      <div className="form-item">
        <label className="label">{t('images convention')}</label>
        <select name="imagesConvention" className="select" value={globalData.imagesConvention} onChange={handleChange}>
          {NAMING_CONVENTION.map((convention, index) => (
            <option value={index} key={index} disabled={index === 0}>
              {t(convention)}
              {CONVENTION_IMAGES_EXAMPLES[index]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label className="label">{t('repeated images')}</label>
        <Checkbox
          id="overrideRepeatedImages"
          name="overrideRepeatedImages"
          checked={globalData.overrideRepeatedImages}
          onChange={handleChange}
        >
          {t('export override option')}
        </Checkbox>
      </div>
      <div className="form-item">
        <label className="label">{t('webp export')}</label>
        <Checkbox id="exportWebP" name="exportWebP" checked={globalData.exportWebP} onChange={handleChange}>
          {t('export webp for png and jpg')}
        </Checkbox>
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(Settings, 'settings'));
