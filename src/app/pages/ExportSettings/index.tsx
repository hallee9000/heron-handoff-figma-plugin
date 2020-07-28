import React, {useState, useEffect} from 'react';
import {LangContext} from '@lang/lang-context';
import {getFileName, renameImages} from '@utils/helper';
import {Warning} from '@components/icons';
import Generate from '@components/Generate';
import cn from 'classnames';

import './style.less';

export interface Props {
  messageData: any;
  onSecceed: () => void;
}

export default ({messageData, onSecceed}) => {
  const [visible, setVisible] = useState(false);
  const [allSelected, setAllSelected] = useState(true);
  const [exportSettings, setExportSettings] = useState([]);
  const [data, setData] = useState({fileData: {}, pagedFrames: {}, selectedFrameKeys: [], includeComponents: false});

  useEffect(() => {
    const {type, message} = messageData;
    if (type === 'bg:document-got') {
      const {fileData, pagedFrames, selectedFrameKeys, includeComponents} = message;
      const exportSettings = getRenamedExportSettings(fileData.exportSettings);
      toggleCheckAll(exportSettings, true);
      delete fileData.exportSettings;
      setData({fileData, pagedFrames, selectedFrameKeys, includeComponents});
      setVisible(true);
    }
  }, [messageData.type]);

  useEffect(() => {
    setAllSelected(checkedExportSettings(exportSettings).length === exportSettings.length);
  }, [exportSettings]);

  const getRenamedExportSettings = exportSettings => {
    const originalNames = exportSettings.map(exportSetting => getFileName(exportSetting));
    return renameImages(originalNames).map((rename, index) => ({
      ...exportSettings[index],
      isRepeated: originalNames[index] !== rename,
      rename
    }));
  };

  const toggleCheckAll = (exportSettings, flag) => {
    setExportSettings(exportSettings.map(exportSetting => ({...exportSetting, checked: flag})));
  };

  const checkedExportSettings = exportSettings => exportSettings.filter(({checked}) => checked);

  const handleCheckAll = e => {
    if (e.target.checked) {
      toggleCheckAll(exportSettings, true);
      setAllSelected(true);
    } else {
      toggleCheckAll(exportSettings, false);
      setAllSelected(false);
    }
  };

  const handleCheck = e => {
    const {id, checked} = e.target;
    const index = id.replace('export-', '') - 0;
    setExportSettings(
      exportSettings.map((exportSetting, i) => (i === index ? {...exportSetting, checked} : exportSetting))
    );
  };
  return (
    <LangContext.Consumer>
      {langData => (
        <div className={cn('exports', {'exports-visible': visible})}>
          <div className="exports-header">
            <div className="type type--pos-large-bold">{langData['export title']}</div>
            {!!exportSettings.length ? (
              <div className="type type--pos-small-normal">{langData['export description']}</div>
            ) : (
              <div className="header-empty type type--pos-small-normal">{langData['no export']}</div>
            )}
            <div className="type type--pos-small-normal header-rename-explain">
              <Warning size={12} />
              {langData['export rename explain']}
            </div>
            {!!exportSettings.length && (
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="allSelected"
                  className="checkbox__box"
                  checked={allSelected}
                  onChange={handleCheckAll}
                />
                <label className="checkbox__label" htmlFor="allSelected">
                  {langData['select all']}
                </label>
              </div>
            )}
          </div>
          <ul className="exports-images">
            {exportSettings.map((exportSetting, index) => (
              <li key={index}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id={`export-${index}`}
                    className="checkbox__box"
                    checked={exportSetting.checked}
                    onChange={handleCheck}
                  />
                  <label
                    className="checkbox__label"
                    htmlFor={`export-${index}`}
                    title={exportSetting.isRepeated ? langData['repeated'] : ''}
                  >
                    {exportSetting.isRepeated && <Warning size={12} />}
                    {exportSetting.rename}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {visible && (
            <Generate
              data={data}
              originalExportSettings={exportSettings}
              exportSettings={checkedExportSettings(exportSettings)}
              messageData={messageData}
              onSecceed={onSecceed}
            />
          )}
        </div>
      )}
    </LangContext.Consumer>
  );
};
