import React, {useState, useEffect, useMemo} from 'react';
import cn from 'classnames';
import Tree from 'rc-tree';
import Header from '@components/Header';
import Modal from '@app/components/Modal';
import FrameSettings from '@app/components/FrameSettings';
import TreeNodeIcon from '@app/components/TreeNodeIcon';
import {Settings} from '@components/icons';
import {getKeys, getSelectedKeys, getNestedPageFrames, getSortedAllFrames} from '@utils/frames';
import {withGlobalContextConsumer, withTranslation} from '@app/context';

import './style.less';
import {sendMessageToBackground} from '@utils/helper';

export interface Props {
  globalData: any;
  changeGlobalData: (property, value) => void;
  messageData: any;
  onNext: (frameOptions, nestedFrameOptions, checkedKeys) => void;
  t: (key) => string;
}

const Selector = ({globalData, changeGlobalData, messageData, onNext, t}: Props) => {
  const [settingsVisible, toggleSettings] = useState(false);
  const [allFrames, setAllFrames] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const {sortOrder, useNestedPages} = globalData;
  const sortedFramesData = useMemo(() => getSortedAllFrames(allFrames), [allFrames]);
  const frameOptions = useMemo(() => sortedFramesData[sortOrder] || [], [sortedFramesData, sortOrder]);
  const nestedFrameOptions = useMemo(() => (!!frameOptions.length ? getNestedPageFrames(frameOptions) : []), [
    frameOptions
  ]);
  const options = useNestedPages ? nestedFrameOptions : frameOptions;
  const keysData = useMemo(() => getKeys(options), [options]);

  // effects
  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:frames-got') {
      const {allFrames, currentPageId, selectedFrames} = message;
      setAllFrames(allFrames);
      setCheckedKeys(getSelectedKeys(selectedFrames));
      setExpandedKeys([currentPageId]);
    }
    // 选择改变时
    if (type === 'bg:selection-change') {
      const {selectedFrames} = message;
      setCheckedKeys(getSelectedKeys(selectedFrames));
    }
    // 切换页面时
    if (type === 'bg:current-page-change') {
      const {currentPageId} = message;
      if (!expandedKeys.includes(currentPageId)) {
        setExpandedKeys([currentPageId, ...expandedKeys]);
      }
    }
  }, [messageData]);

  // 展开时
  const handleExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
  };

  // 勾选时
  const handleTreeOptionCheck = checkedKeys => {
    setCheckedKeys(checkedKeys);
    // 选中了全部
    setIsAllSelected(checkedKeys.length === keysData.allKeys.length);
    // 每次勾选变化时，需要通知 Figma 更改选中项
    sendMessageToBackground('ui:checked-keys-changed', checkedKeys);
  };

  const toggleExpandAll = shouldExpand => {
    setExpandedKeys(shouldExpand ? keysData.folderKeys : []);
  };

  const handleSelectAll = isChecked => {
    setCheckedKeys(isChecked ? keysData.allKeys : []);
    // 每次勾选变化时，需要通知 Figma 更改选中项
    sendMessageToBackground('ui:checked-keys-changed', checkedKeys);
  };

  const showSettings = () => {
    changeGlobalData('view', 'settings');
    onNext(frameOptions, nestedFrameOptions, checkedKeys);
  };

  return (
    <div className={cn('selector', {visible: globalData.view === 'selector'})}>
      <Header
        isAllSelected={isAllSelected}
        folderKeys={keysData.folderKeys}
        expandedKeys={expandedKeys}
        onToggleExpand={toggleExpandAll}
        onSelectAllChange={handleSelectAll}
      />
      <div className="selector-tree">
        <Tree
          checkable
          selectable={false}
          treeData={options}
          expandedKeys={expandedKeys}
          onExpand={handleExpand}
          checkedKeys={checkedKeys}
          onCheck={handleTreeOptionCheck}
          showIcon={useNestedPages}
          icon={TreeNodeIcon}
        />
      </div>
      <Modal isOpen={settingsVisible} onClose={() => toggleSettings(false)}>
        <FrameSettings visible={settingsVisible} />
      </Modal>
      <div className="selector-actions">
        {!!allFrames.length && !checkedKeys.length && (
          <div className="actions-error type type--pos-small-bold">{t('at least')}</div>
        )}
        <div className="buttons">
          <span className="type type--pos-small-bold" onClick={() => toggleSettings(true)}>
            <Settings /> 排序等设置
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
