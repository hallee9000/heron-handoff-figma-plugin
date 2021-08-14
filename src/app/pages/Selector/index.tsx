import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import Tree from 'rc-tree';
import Header from '@components/Header';
import {getFlattenedFrameKeys, getPageKeys, getSortedAllFrames} from '@utils/frames';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {changeSettingsAndNotifyBackground} from '@utils/helper';
import {SORT_ORDERS} from '@app/constants';

import './style.less';

export interface Props {
  globalData: any;
  changeGlobalData: (property, value) => void;
  messageData: any;
  onNext: (allFrames, checkedKeys) => void;
  t: (key) => string;
}

const Selector = ({globalData, changeGlobalData, messageData, onNext, t}: Props) => {
  const [allFrames, setAllFrames] = useState([]);
  const [sortedFramesData, setSortedFramesData] = useState([]);
  const [currentFrames, setCurrentFrames] = useState([]);
  const [currentPageKey, setCurrentPageKey] = useState();
  const [keys, setKeys] = useState({frame: [], page: []});
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // effects
  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:frames-got') {
      const {allFrames, currentFrames, currentPageKey} = message;
      setCurrentFrames(currentFrames);
      setCurrentPageKey(currentPageKey);

      const sortedFramesData = getSortedAllFrames(allFrames);
      setSortedFramesData(sortedFramesData);
      setAllFrames(sortedFramesData[globalData.sortOrder]);
    }
  }, [messageData.type]);

  useEffect(() => {
    const keys = {frame: getFlattenedFrameKeys(allFrames), page: getPageKeys(allFrames)};
    setKeys(keys);
  }, [allFrames]);

  useEffect(() => {
    setCheckedKeys(currentFrames);
    setExpandedKeys([currentPageKey]);
  }, [currentFrames, currentPageKey]);

  // methods
  const handleExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
  };

  const handleTreeOptionCheck = checkedKeys => {
    setCheckedKeys(checkedKeys);
    setIsAllSelected(checkedKeys.length === keys.frame.length + keys.page.length);
  };

  const handleSelectAll = isChecked => {
    setCheckedKeys(isChecked ? keys.frame : []);
  };

  const toggleExpandAll = shouldExpand => {
    setExpandedKeys(shouldExpand ? keys.page : []);
  };

  const showSettings = () => {
    changeGlobalData('view', 'settings');
    onNext(allFrames, checkedKeys);
  };

  // 切换排序方式
  const handleSortOrderChange = e => {
    const sortIndex = +e.target.value;
    changeGlobalData('sortOrder', sortIndex);
    changeSettingsAndNotifyBackground(globalData, {sortOrder: sortIndex});
    setAllFrames(sortedFramesData[sortIndex]);
  };

  return (
    <div className={cn('selector', {visible: globalData.view === 'selector'})}>
      <Header
        isAllSelected={isAllSelected}
        pageKeys={keys.page}
        expandedKeys={expandedKeys}
        onToggleExpand={toggleExpandAll}
        onSelectAllChange={handleSelectAll}
      />
      <div className="selector-tree">
        <Tree
          checkable
          selectable={false}
          checkedKeys={checkedKeys}
          expandedKeys={expandedKeys}
          onExpand={handleExpand}
          showIcon={false}
          treeData={allFrames}
          onCheck={handleTreeOptionCheck}
        />
      </div>
      <div className="selector-actions">
        {!!allFrames.length && !checkedKeys.length && (
          <div className="actions-error type type--pos-small-bold">{t('at least')}</div>
        )}
        <div className="buttons">
          <span className="type type--pos-small-bold">
            {t('frame order')}
            <select name="sortOrder" className="select" value={globalData.sortOrder} onChange={handleSortOrderChange}>
              {SORT_ORDERS.map((order, index) => (
                <option value={index} key={order}>
                  {t(order)}
                </option>
              ))}
            </select>
          </span>
          <button className="button button--primary" onClick={showSettings}>
            {t('next step')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(Selector));
