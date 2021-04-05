import {getAllPagedFrames, getCurrentPageFrameKeys, getSelectedFrameKeys} from '@utils/frames';
import {sendMessage} from '@utils/helper';
import {exportFrame, exportComponent, exportSlice} from '@utils/export';
import {walkDocument} from '@utils/walk';
import initial from '@utils/initial';
import {getUserId} from '@utils/identifyUser';

let fileData, globalData;
let frameNodes = [],
  exportSettingNodes = [],
  componentNodes = [],
  exportNodes = [];

figma.showUI(__html__, {width: 320, height: 520});

// get if welcomed and settings from local storage
initial();
// send mixpanel user id
getUserId();

figma.ui.onmessage = async msg => {
  if (msg.type === 'ui:set-welcomed') {
    await figma.clientStorage.setAsync('welcomed', true);
  } else if (msg.type === 'ui:set-settings') {
    await figma.clientStorage.setAsync('heronHandoff.settings', msg.settings);
  } else if (msg.type === 'ui:get-frames') {
    const hasSelections = !!figma.currentPage.selection.length;
    sendMessage({
      type: 'bg:frames-got',
      message: {
        allFrames: getAllPagedFrames(figma.root),
        currentFrames: hasSelections
          ? getSelectedFrameKeys(figma.currentPage)
          : getCurrentPageFrameKeys(figma.currentPage),
        currentPageKey: figma.currentPage.id
      }
    });
  } else if (msg.type === 'ui:start-generating') {
    const {selectedFrameKeys, globalData: gd} = msg;
    globalData = gd;
    const data = walkDocument(figma.root, selectedFrameKeys, globalData);
    fileData = data.fileData;
    frameNodes = data.frameNodes;
    exportSettingNodes = data.exportSettingNodes;
    componentNodes = data.componentNodes;

    sendMessage({
      type: 'bg:document-got',
      message: {fileData}
    });
  } else if (msg.type === 'ui:start-exporting') {
    console.log(JSON.stringify(fileData));
    const {includeComponents} = globalData;
    exportNodes = frameNodes.concat(exportSettingNodes, includeComponents ? componentNodes : []);
    sendMessage({
      type: 'bg:export-ready'
    });
  } else if (msg.type === 'ui:export-image') {
    // will post bg:image-exported message
    const {index} = msg;
    const {exportType, node} = exportNodes[index];
    switch (exportType) {
      case 'frame':
        await exportFrame(node);
        break;
      case 'exportSetting':
        await exportSlice(node, fileData.exportSettings, index - frameNodes.length);
        break;
      case 'component':
        await exportComponent(node);
        break;
    }
  } else if (msg.type === 'ui:close-plugin') {
    figma.closePlugin();
  }
};
