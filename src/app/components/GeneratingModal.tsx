import React, {useEffect, useState} from 'react';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import {trimFilePath, getFileMeta, handleWebPExportSettings} from '@utils/helper';
import {withGlobalContextConsumer, withTranslation} from '@app/context';
import {getFlattenedFrameKeys, getSelectedPagedFrames} from '@utils/frames';
import {downloadHTMLAndAssets} from '@utils/download';
import mixpanel from '@utils/mixpanel';

import './generating-modal.less';

const zip = new JSZip();

const GeneratingModal = ({globalData, framesData, messageData, onFinished, t}) => {
  const pagedFrames = getSelectedPagedFrames(framesData.allFrames, framesData.checkedKeys);
  const selectedFrameKeys = getFlattenedFrameKeys(framesData.allFrames, framesData.checkedKeys);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState({});
  const [currentFileName, setCurrentFileName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [buttonText, setButtonText] = useState('processing design file');
  const [errorMessage, setErrorMessage] = useState('');

  // tell background to start exporting
  useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'ui:start-generating',
          pagedFrames,
          selectedFrameKeys,
          globalData
        }
      },
      '*'
    );
  }, []);

  // listen to messages from background
  useEffect(() => {
    const {type, message} = messageData;
    switch (type) {
      case 'bg:document-got':
        const {fileData} = message;
        setDocumentName(fileData.name);
        const countData = getCountData(fileData);
        zipHTMLAndAssets(zip, fileData, countData);
        break;
      case 'bg:export-ready':
        sendMessage({type: 'ui:export-image', index: 0});
        break;
      case 'bg:image-exported':
        zipImageExport(zip, message);
        break;
      case 'bg:error':
        const {errorMessage} = message;
        setErrorMessage(errorMessage);
        break;
    }
  }, [messageData]);

  // set count data once fileData got
  const getCountData = fileData => {
    const count = {
      frame: selectedFrameKeys.length,
      component: fileData.components.length,
      exportSetting: fileData.exportSettings ? fileData.exportSettings.length : 0
    };
    setCount(count);
    return count;
  };

  // get total number of images need to export
  const getTotal = (count, includeComponents) =>
    Object.keys(count)
      .filter(key => (!includeComponents ? key !== 'component' : true))
      .map(key => count[key])
      .reduce((a, b) => a + b, 0);

  const sendMessage = message => {
    // console.log(message.type);
    parent.postMessage({pluginMessage: message}, '*');
  };

  const setPercentageText = (percentage, buttonText) => {
    // console.log('percentage', percentage)
    setPercentage(percentage);
    setButtonText(buttonText);
  };

  const zipHTMLAndAssets = async (zip, fileData, countData) => {
    // zip.file('file.json', JSON.stringify(fileData))
    const settings = {...globalData};
    delete settings.view;
    delete settings.imagesConvention;
    delete settings.overrideRepeatedImages;
    // add webp exporting so we can see them in slices list
    const exportSettings = handleWebPExportSettings(fileData.exportSettings, globalData.exportWebP);
    // zip assets of website
    await downloadHTMLAndAssets(
      zip,
      {fileData: {...fileData, exportSettings}, pagedFrames, settings},
      (phase, percentage) => {
        setPercentageText(percentage, phase);
      }
    );
    if (getTotal(countData, settings.includeComponents)) {
      // start to export
      sendMessage({type: 'ui:start-exporting'});
    }
  };

  const exportWebP = (imgData, fileName) => {
    const {type, name} = getFileMeta(fileName);
    // console.log(type, fileName)
    // only process png and jpg
    if (['png', 'jpg'].indexOf(type) < 0) {
      return;
    }
    return new Promise(function(resolve, _reject) {
      const blob = new Blob([imgData], {type: `image/${type}`});
      const imageUrl = URL.createObjectURL(blob);
      let image = new Image();
      image.src = imageUrl;

      image.addEventListener('load', function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0);
        canvas.toBlob(function(blob) {
          zip.file(`data/exports/${name}.webp`, blob);
          image = null;
          resolve('finished');
        }, 'image/webp');
      });
    });
    // document.body.appendChild(image)
  };

  const zipImageExport = async (zip, message) => {
    // get file, zip it
    const {type, fileActualName, fileName, imgData} = message;
    if (type === 'frame' || type === 'component') {
      zip.file(`data/${fileName}`, imgData);
    } else if (type === 'exportSetting') {
      if (globalData.exportWebP) {
        await exportWebP(imgData, fileName);
      }
      zip.file(`data/exports/${fileName}`, imgData);
    }
    // next one
    const total = getTotal(count, globalData.includeComponents);
    if (index < total) {
      setPercentageText(Math.floor(percentage + 86 / total), 'generating file');
      setCurrentFileName(fileActualName);
      sendMessage({type: 'ui:export-image', index});
      setIndex(index + 1);
    } else {
      setCurrentFileName('');
      setPercentageText(100, 'zip processing');
      zip.generateAsync({type: 'blob'}).then(content => {
        setPercentageText(0, 'over');
        saveAs(content, `${trimFilePath(documentName)}.zip`);
        mixpanel.track('Juuust Handoff', {Action: 'Exporting completed'});
      });
    }
  };

  const closePlugin = () => {
    parent.postMessage({pluginMessage: {type: 'ui:close-plugin'}}, '*');
  };

  return (
    <div className="generating-modal-overlay">
      <div className="generating-modal">
        <div className="modal-tip type type--pos-small-bold">
          {t(buttonText === 'over' ? 'exporting finished' : "exporting and don't close")}
        </div>
        {errorMessage && (
          <div className="modal-error type type--pos-small-bold">
            {t('error occurs when parsing') + errorMessage + t('please check it')}
          </div>
        )}
        {errorMessage ? (
          <button className="button button--secondary" onClick={closePlugin}>
            {t('close check')}
          </button>
        ) : // over, show close button
        buttonText === 'over' ? (
          <>
            <button className="button button--primary btn-support" onClick={onFinished}>
              {t('share or support me')}
            </button>
            <button className="button button--secondary" onClick={closePlugin}>
              {t('close plugin')}
            </button>
          </>
        ) : (
          <button className="button button--primary" disabled>
            <div style={{width: `${percentage}%`}} />
            <span>
              {t(buttonText)} {currentFileName}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default withGlobalContextConsumer(withTranslation(GeneratingModal));
