import React from 'react';
import cn from 'classnames';
import {Docs} from '@app/components/icons';
import Checkbox from '@app/components/Checkbox';
import {SORT_ORDERS} from '@app/constants';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import './style.less';

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
          href="https://docs.heron.design/designer/#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E9%80%89%E4%BA%86-2x-%E6%A0%87%E6%B3%A8%E5%8F%98%E6%88%90%E4%B8%80%E5%8D%8A%E4%BA%86"
          target="_blank"
        >
          {t('see explanation')}
          <Docs size={12} />
        </a>
      </div>
      <div className="actions">
        <button className="button button--primary">{t('ok')}</button>
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(FrameSettings));
