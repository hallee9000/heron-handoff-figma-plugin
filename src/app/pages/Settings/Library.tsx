import React from 'react';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import Checkbox from '@components/Checkbox';
import {NAMING_CONVENTION, CONVENTION_LIBRARY_EXAMPLES} from '@app/constants';

const Library = ({globalData, changeGlobalData, t}) => {
  const handleChange = e => {
    const {type, name, value, checked} = e.target;
    const numericValue = type === 'checkbox' ? checked : value - 0;
    changeGlobalData(name, numericValue);
    changeSettingsAndNotifyBackground(globalData, {[name]: numericValue});
  };
  return (
    <div className="settings-block">
      <div className="section-title type type--pos-medium-bold">{t('style and components')}</div>
      <div className="form-item">
        <label className="label">{t('naming convention')}</label>
        <select name="convention" className="select" value={globalData.convention} onChange={handleChange}>
          {NAMING_CONVENTION.map((convention, index) => (
            <option value={index} key={index}>
              {t(convention)}
              {CONVENTION_LIBRARY_EXAMPLES[index]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label className="label">{t('components list')}</label>
        <Checkbox
          name="includeComponents"
          id="includeComponents"
          checked={globalData.includeComponents}
          onChange={handleChange}
        >
          {t('include components')}
        </Checkbox>
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(Library, 'settings'));
