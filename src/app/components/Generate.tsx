import React, {useState, useEffect} from 'react';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import {LangContext} from '@lang/lang-context';
import {trimFilePath} from '@utils/helper';
import {downloadHTMLAndAssets} from '@utils/download';
import mixpanel from '@utils/mixpanel';

import './generate.less';

export interface Props {
  data: any;
  originalExportSettings: any[];
  exportSettings: any[];
  messageData: any;
  onSecceed: () => void;
}

const zip = new JSZip();

export default ({data, exportSettings, originalExportSettings, messageData, onSecceed}) => {
  const {fileData: file_data, pagedFrames, selectedFrameKeys, includeComponents} = data;
  const documentName = file_data.name;

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [buttonText, setButtonText] = useState('generate design specs');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(file_data);

  useEffect(() => {
    const {type, message} = messageData;
    switch (type) {
      case 'bg:image-exported':
        zipImageExport(zip, message);
        break;
      case 'bg:export-ok':
        sendMessage({type: 'ui:export-image', index: 0});
        break;
      case 'bg:error':
        const {errorMessage} = message;
        setErrorMessage(errorMessage);
        break;
    }
  }, [messageData]);

  useEffect(() => {
    const fileData = {...file_data, exportSettings};
    setFileData(fileData);
  }, [exportSettings]);

  useEffect(() => {
    const count = {
      frame: selectedFrameKeys.length,
      component: fileData.components.length,
      exportSetting: fileData.exportSettings ? fileData.exportSettings.length : 0
    };
    setCount(count);
  }, [fileData]);

  const getTotal = (count, includeComponents) =>
    Object.keys(count)
      .filter(key => (!includeComponents ? key !== 'component' : true))
      .map(key => count[key])
      .reduce((a, b) => a + b, 0);

  const sendMessage = message => {
    // console.log(message.type);
    parent.postMessage({pluginMessage: message}, '*');
  };

  const zipHTMLAndAssets = async zip => {
    // zip.file('file.json', JSON.stringify(fileData))
    mixpanel.track('Juuust Handoff', {Action: 'Start exporting'});
    // zip assets of website
    await downloadHTMLAndAssets(zip, {fileData, pagedFrames, includeComponents}, (phase, percentage) => {
      setPercentageText(percentage, phase);
    });
    if (getTotal(count, includeComponents)) {
      // start to export
      sendMessage({type: 'ui:start-export', originalExportSettings, exportSettings});
    }
  };

  const zipImageExport = (zip, message) => {
    // get file, zip it
    const {type, fileActualName, fileName, imgData} = message;
    if (type === 'frame' || type === 'component') {
      zip.file(`data/${fileName}`, imgData);
    } else if (type === 'exportSetting') {
      zip.file(`data/exports/${fileName}`, imgData);
    }
    // next one
    const total = getTotal(count, includeComponents);
    if (index < total) {
      setPercentageText(Math.floor(percentage + 86 / total), 'generating file');
      setFileName(fileActualName);
      sendMessage({type: 'ui:export-image', index});
      setIndex(index + 1);
    } else {
      setFileName('');
      setPercentageText(100, 'zip processing');
      zip.generateAsync({type: 'blob'}).then(content => {
        setPercentageText(0, 'over');
        saveAs(content, `${trimFilePath(documentName)}.zip`);
        onSecceed();
        mixpanel.track('Juuust Handoff', {Action: 'Exporting completed'});
      });
    }
  };

  const setPercentageText = (percentage, buttonText) => {
    // console.log('percentage', percentage)
    setPercentage(percentage);
    setButtonText(buttonText);
  };

  const handleGenerate = () => {
    zipHTMLAndAssets(zip);
  };

  const closePlugin = () => {
    parent.postMessage({pluginMessage: {type: 'ui:close-plugin'}}, '*');
  };

  return (
    <LangContext.Consumer>
      {langData => (
        <div className="exports-actions">
          {errorMessage && <div className="actions-error type type--pos-small-bold">{errorMessage}</div>}
          {errorMessage ? (
            <button className="button button--secondary" onClick={closePlugin}>
              {langData['close check']}
            </button>
          ) : buttonText === 'over' ? (
            <button className="button button--secondary" onClick={closePlugin}>
              {langData['close plugin']}
            </button>
          ) : (
            <button className="button button--primary" onClick={handleGenerate}>
              <div style={{width: `${percentage}%`}} />
              <span>
                {langData[buttonText]}
                {fileName}
              </span>
            </button>
          )}
        </div>
      )}
    </LangContext.Consumer>
  );
};
