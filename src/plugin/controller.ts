import {getAllPagedFrames, getCurrentPageFrameKeys, getSelectedFrameKeys} from '../utils/frames';
import {sendMessage} from '../utils/helper';
import {exportFrame, exportComponent, exportExportSetting} from '../utils/export';
import {walkDocument} from '../utils/walk';
import {getUserId} from '../utils/identifyUser';

let fileData, useHDImages, includeComponents;
let frameNodes = [],
  exportSettingNodes = [],
  componentNodes = [],
  exportNodes = [];

figma.showUI(__html__, {width: 320, height: 480});

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

figma.ui.onmessage = async msg => {
  if (msg.type === 'ui:set-welcomed') {
    await figma.clientStorage.setAsync('welcomed', true);
  } else if (msg.type === 'ui:get-welcomed') {
    const welcomed = await figma.clientStorage.getAsync('welcomed');
    sendMessage({
      type: 'bg:welcomed-got',
      message: {welcomed}
    });
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
    const {pagedFrames, selectedFrameKeys, includeComponents: withComponents, useHDImages: useHD} = msg;
    const data = walkDocument(figma.root, selectedFrameKeys, withComponents);
    fileData = data.fileData;
    includeComponents = withComponents;
    useHDImages = useHD;
    frameNodes = data.frameNodes;
    exportSettingNodes = data.exportSettingNodes;
    componentNodes = data.componentNodes;
    exportNodes = frameNodes.concat(exportSettingNodes, includeComponents ? componentNodes : []);

    sendMessage({
      type: 'bg:document-got',
      message: {fileData, pagedFrames, selectedFrameKeys, includeComponents, useHDImages}
    });
  } else if (msg.type === 'ui:export-image') {
    // will post bg:image-exported message
    const {index} = msg;
    const {exportType, node} = exportNodes[index];
    switch (exportType) {
      case 'frame':
        await exportFrame(node, useHDImages);
        break;
      case 'exportSetting':
        await exportExportSetting(node, fileData.exportSettings, index - frameNodes.length);
        break;
      case 'component':
        await exportComponent(node, useHDImages);
        break;
    }
  } else if (msg.type === 'ui:close-plugin') {
    figma.closePlugin();
  }
};
