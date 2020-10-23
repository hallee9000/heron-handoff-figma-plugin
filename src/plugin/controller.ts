import {getAllPagedFrames, getCurrentPageFrameKeys, getSelectedFrameKeys} from '@utils/frames';
import {sendMessage} from '@utils/helper';
import {exportFrame, exportComponent, exportExportSetting} from '@utils/export';
import {walkDocument} from '@utils/walk';
import {getUserId} from '@utils/identifyUser';

let fileData, exportSettings;
let includeComponents = false;
let frameNodes = [],
  exportSettingNodes = [],
  componentNodes = [],
  exportNodes = [];

figma.showUI(__html__, {width: 320, height: 500});

// send mixpanel user id
getUserId();

// figma.on('currentpagechange', () => {
//   // change page
//   console.log(figma.currentPage.selection)
// })

// figma.on('selectionchange', () => {
//   // change selection
//   console.log(figma.currentPage.selection)
// })

figma.clientStorage.getAsync('welcomed').then(isWelcomed => {
  sendMessage({
    type: 'bg:check-welcome',
    message: {isWelcomed}
  });
});

figma.clientStorage.getAsync('language').then(language => {
  sendMessage({
    type: 'bg:language-got',
    message: {language}
  });
});

figma.ui.onmessage = async msg => {
  if (msg.type === 'ui:set-welcomed') {
    await figma.clientStorage.setAsync('welcomed', true);
  } else if (msg.type === 'ui:set-language') {
    await figma.clientStorage.setAsync('language', msg.language);
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
  } else if (msg.type === 'ui:get-document') {
    const {pagedFrames, selectedFrameKeys, includeComponents: ics} = msg;
    includeComponents = ics;
    const data = walkDocument(figma.root, selectedFrameKeys, includeComponents);
    fileData = data.fileData;
    frameNodes = data.frameNodes;
    exportSettingNodes = data.exportSettingNodes;
    componentNodes = data.componentNodes;

    sendMessage({
      type: 'bg:document-got',
      message: {fileData, pagedFrames, selectedFrameKeys, includeComponents}
    });
  } else if (msg.type === 'ui:start-export') {
    const {originalExportSettings, exportSettings: ess} = msg;
    exportSettings = ess;
    exportSettingNodes = exportSettingNodes.filter(
      (_exportSettingNode, index) => originalExportSettings[index].checked
    );
    exportNodes = frameNodes.concat(exportSettingNodes, includeComponents ? componentNodes : []);
    sendMessage({
      type: 'bg:export-ok'
    });
  } else if (msg.type === 'ui:export-image') {
    // will post bg:image-exported message
    const {index} = msg;
    const {exportType, node} = exportNodes[index];
    console.log(node);
    switch (exportType) {
      case 'frame':
        await exportFrame(node);
        break;
      case 'exportSetting':
        await exportExportSetting(node, exportSettings, index - frameNodes.length);
        break;
      case 'component':
        await exportComponent(node);
        break;
    }
  } else if (msg.type === 'ui:close-plugin') {
    figma.closePlugin();
  }
};
