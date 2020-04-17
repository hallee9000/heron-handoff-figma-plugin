import * as React from 'react';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import Welcome from './components/Welcome';
import Selector from './components/Selector';
import {trimFilePath} from '../utils/helper';
import {downloadHTMLAndAssets} from '../utils/download';

import './assets/ds.css';
import './assets/base.less';
import './assets/widgets.less';
import './app.less';

interface Data {
  allFrames: any;
  currentFrames: any;
  currentPageKey: string;
}

const defaultData: Data = {allFrames: null, currentFrames: null, currentPageKey: ''};

export default class App extends React.Component {
  index = 0;
  exportType = 'frame';
  count = {frame: 0, component: 0, exportSetting: 0};
  total = 0;
  includeComponents = false;
  documentName = '';
  state = {
    data: defaultData,
    isWaiting: true,
    percentage: 0,
    buttonText: 'Start exporting'
  };
  sendMessage = message => {
    // console.log(message.type);
    parent.postMessage({pluginMessage: message}, '*');
  };
  getFrames = () => {
    this.sendMessage({type: 'ui:set-welcomed'});
    this.sendMessage({type: 'ui:get-frames'});
  };
  handleStartExport = data => {
    this.setPercentage(1, 'Processing file, please wait ……');
    setTimeout(() => {
      this.sendMessage({type: 'ui:get-document', ...data});
    }, 100);
  };
  zipHTMLAndAssets = async (zip, message) => {
    const {fileData, pagedFrames, selectedFrameKeys, includeComponents} = message;
    // set count data
    this.count.frame = selectedFrameKeys.length;
    this.count.component = fileData.components.length;
    this.count.exportSetting = fileData.exportSettings.length;
    this.includeComponents = includeComponents;
    this.documentName = fileData.name;
    this.total = Object.keys(this.count)
      .filter(key => (!includeComponents ? key !== 'component' : true))
      .map(key => this.count[key])
      .reduce((a, b) => a + b, 0);
    // zip.file('file.json', JSON.stringify(fileData))
    // zip assets of website
    await downloadHTMLAndAssets(zip, {fileData, pagedFrames, includeComponents}, (phase, percentage) => {
      this.setPercentage(percentage, phase);
    });
    if (this.total) {
      // start to export
      this.sendMessage({type: 'ui:export-image', index: 0});
    }
  };
  zipImageExport = (zip, message) => {
    // get file, zip it
    const {percentage} = this.state;
    const {type, fileActualName, fileName, imgData} = message;
    if (type === 'frame' || type === 'component') {
      zip.file(`data/${fileName}`, imgData);
    } else if (type === 'exportSetting') {
      zip.file(`data/exports/${fileName}`, imgData);
    }
    // next one
    if (this.index < this.total) {
      this.setPercentage(Math.floor(percentage + 86 / this.total), `Generating ${fileActualName}`);
      this.sendMessage({type: 'ui:export-image', index: this.index++});
    } else {
      this.setPercentage(100, 'Zip exported');
      zip.generateAsync({type: 'blob'}).then(content => {
        this.setPercentage(0, 'Export again');
        saveAs(content, `${trimFilePath(this.documentName)}.zip`);
      });
    }
  };
  setPercentage = (percentage, buttonText) => {
    // console.log('percentage', percentage)
    this.setState({percentage, buttonText});
  };
  async componentDidMount() {
    const zip = new JSZip();
    // check if welcomed
    this.sendMessage({type: 'ui:get-welcomed'});
    window.onmessage = async event => {
      const {type, message} = event.data.pluginMessage || {};
      switch (type) {
        case 'bg:welcomed-got':
          if (message.welcomed) {
            this.sendMessage({type: 'ui:get-frames'});
          } else {
            this.setState({isWaiting: false});
          }
          break;
        case 'bg:frames-got':
          const {allFrames, currentFrames, currentPageKey} = message;
          this.setState({
            isWaiting: false,
            data: {allFrames, currentFrames, currentPageKey}
          });
          break;
        case 'bg:document-got':
          await this.zipHTMLAndAssets(zip, message);
          break;
        case 'bg:image-exported':
          this.zipImageExport(zip, message);
          break;
      }
    };
  }
  render() {
    const {data, isWaiting, percentage, buttonText} = this.state;
    const {allFrames, currentFrames, currentPageKey} = data;
    const hasValue = !!(allFrames && currentFrames);
    return (
      <div className="app">
        {!isWaiting && (
          <React.Fragment>
            <Welcome visible={!hasValue} onStart={this.getFrames} />
            {hasValue && (
              <Selector
                visible={hasValue}
                allFrames={allFrames}
                currentFrames={currentFrames}
                currentPageKey={currentPageKey}
                percentage={percentage}
                buttonText={buttonText}
                onStart={this.handleStartExport}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
