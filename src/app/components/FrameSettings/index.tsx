import React from 'react';
import cn from 'classnames';
import {Docs} from '@app/components/icons';
import Checkbox from '@app/components/Checkbox';
import {SORT_ORDERS} from '@app/constants';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';

const FrameSettings = function({visible, t, changeGlobalData, globalData}) {
  // 切换排序方式
  const handleSortOrderChange = e => {
    const sortIndex = +e.target.value;
    changeGlobalData('sortOrder', sortIndex);
    changeSettingsAndNotifyBackground(globalData, {sortOrder: sortIndex});
  };

  // 是否开启多层级页面
  const handleNestedPagesChange = e => {
    const useNestedPages = e.target.checked;
    changeGlobalData('useNestedPages', useNestedPages);
    changeSettingsAndNotifyBackground(globalData, {useNestedPages});
  };

  return (
    <div className={cn('frame-settings', {'frame-settings-visible': visible})}>
      <div className="form-item">
        <label className="label">{t('frame order')}</label>
        <select name="sortOrder" className="select" value={globalData.sortOrder} onChange={handleSortOrderChange}>
          {SORT_ORDERS.map((order, index) => (
            <option value={index} key={order}>
              {t(order)}
            </option>
          ))}
        </select>
      </div>
      <div className="form-item">
        <label className="label">{t('nested pages')}</label>
        <Checkbox
          id="useNestedPages"
          name="useNestedPages"
          checked={globalData.useNestedPages}
          onChange={handleNestedPagesChange}
        >
          {t('nested pages based on /')}
        </Checkbox>
      </div>
      <div className="form-item form-item-helper">
        <label className="label" />
        <a
          className="helper"
          href="https://docs.heron.design/designer/#%E5%A4%9A%E5%B1%82%E7%BA%A7%E9%A1%B5%E9%9D%A2%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D"
          target="_blank"
        >
          {t('see explanation')}
          <Docs size={12} />
        </a>
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(FrameSettings));
