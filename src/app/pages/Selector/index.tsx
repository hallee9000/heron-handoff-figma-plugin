import React, {useState, useEffect} from 'react';
import Tree from 'rc-tree';
import {LangContext} from '@lang/lang-context';
import Header from '@components/Header';
import {getFlattenedFrameKeys, getSelectedPagedFrames, getPageKeys} from '@utils/frames';

import './style.less';

export interface Props {
  messageData: any;
}

export default ({messageData}) => {
  const [allFrames, setAllFrames] = useState([]);
  const [currentFrames, setCurrentFrames] = useState([]);
  const [currentPageKey, setCurrentPageKey] = useState();
  const [keys, setKeys] = useState({frame: [], page: []});
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [includeComponents, setIncludeComponents] = useState(false);

  // effects
  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:frames-got') {
      const {allFrames, currentFrames, currentPageKey} = message;
      setAllFrames(allFrames);
      setCurrentFrames(currentFrames);
      setCurrentPageKey(currentPageKey);
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

  const handleIncludeComponents = e => {
    setIncludeComponents(e.target.checked);
  };

  const handleGetDocument = () => {
    const pagedFrames = getSelectedPagedFrames(allFrames, checkedKeys);
    const selectedFrameKeys = getFlattenedFrameKeys(allFrames, checkedKeys);
    setIsProcessing(true);
    setTimeout(() => {
      parent.postMessage(
        {pluginMessage: {type: 'ui:get-document', pagedFrames, selectedFrameKeys, includeComponents}},
        '*'
      );
    }, 100);
  };

  return (
    <LangContext.Consumer>
      {langData => (
        <div className="selector">
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
              <div className="actions-error type type--pos-small-bold">{langData['at least']}</div>
            )}
            <div className="checkbox">
              <input
                type="checkbox"
                id="includeComponents"
                className="checkbox__box"
                checked={includeComponents}
                onChange={handleIncludeComponents}
              />
              <label className="checkbox__label" htmlFor="includeComponents">
                {langData['include components']}
              </label>
            </div>
            <button className="button button--primary" onClick={handleGetDocument} disabled={isProcessing}>
              {isProcessing ? langData['processing'] : langData['start']}
            </button>
          </div>
        </div>
      )}
    </LangContext.Consumer>
  );
};
