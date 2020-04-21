import {sendMessage, trimFilePath, getFileName} from '../utils/helper';

// start export frames's image
export const exportFrame = async (frameNode, useHDImages) => {
  try {
    const imgData = await frameNode.exportAsync({
      format: 'PNG',
      constraint: {
        type: 'SCALE',
        value: useHDImages ? 2 : 1
      }
    });
    const fileName = trimFilePath(`${frameNode.id}.png`);
    const fileActualName = `${frameNode.name}.png`;
    sendMessage({
      type: 'bg:image-exported',
      message: {
        imgData,
        fileActualName,
        fileName,
        type: 'frame'
      }
    });
  } catch (err) {
    console.log(err);
    figma.notify(`Error occurs when exporting ${frameNode.name}, please check it.`);
  }
};

// start export exportSettings' image
export const exportExportSetting = async (exportNode, exportSettings, index) => {
  try {
    const exportSetting = {...exportSettings[index]};
    const fileName = getFileName(exportSetting, index);
    delete exportSetting.id;
    delete exportSetting.name;
    const imgData = await exportNode.exportAsync(exportSetting);
    sendMessage({
      type: 'bg:image-exported',
      message: {
        imgData,
        fileActualName: fileName,
        fileName,
        type: 'exportSetting'
      }
    });
  } catch (err) {
    console.log(err);
    figma.notify(`Error occurs when exporting ${exportNode.name}, please check it.`);
  }
};

// start export components's image
export const exportComponent = async (componentNode, useHDImages) => {
  try {
    const imgData = await componentNode.exportAsync({
      format: 'PNG',
      constraint: {
        type: 'SCALE',
        value: useHDImages ? 2 : 1
      }
    });
    const fileName = trimFilePath(`${componentNode.id}.png`);
    const fileActualName = `${componentNode.name}.png`;
    sendMessage({
      type: 'bg:image-exported',
      message: {
        imgData,
        fileActualName,
        fileName,
        type: 'component'
      }
    });
  } catch (err) {
    console.log(err);
    figma.notify(`Error occurs when exporting ${componentNode.name}, please check it.`);
  }
};
