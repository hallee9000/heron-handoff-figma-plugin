export const sendMessage = message => {
  // console.log(message.type)
  figma.ui.postMessage(message);
};

export const changeSettingsAndNotifyBackground = (globalData, changes) => {
  const slimGlobalData = {...globalData};
  delete slimGlobalData.view;
  parent.postMessage({pluginMessage: {type: 'ui:set-settings', settings: {...slimGlobalData, ...changes}}}, '*');
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const camelCase = (text, pascalCase?) => {
  const capitalizeText = text => text[0].toUpperCase() + text.slice(1);
  const pieces = text.split('-');
  return pieces.map((piece, index) => (!pascalCase && index === 0 ? piece : capitalizeText(piece))).join('');
};

// replace `/`、`:` and space as -
export const trimFilePath = filePath =>
  filePath
    .replace(/\//g, '-')
    .replace(/:/g, '-')
    .replace(/ /g, '');

export const getFileName = (exportSetting, imagesConvention?) => {
  const {name, suffix, format, constraint} = exportSetting;
  let fileName = suffix ? `${name}-${suffix}` : name;
  const isScaleX = /^@([1-9]\d*)x$/.test(suffix);
  const isWithoutConstraint = format === 'SVG' || format === 'PDF';
  const scale = isWithoutConstraint || isScaleX ? '' : `@${constraint.value}x`;
  const fileFormat = format.toLowerCase();
  fileName = `${fileName}${scale}.${fileFormat}`;
  return getConventionName(fileName, imagesConvention);
};

export const getConventionName = (name, convention) => {
  switch (convention) {
    case 1:
      return trimFilePath(name).replace(/-/g, '_');
    case 2:
      return trimFilePath(name);
    case 3:
      return camelCase(trimFilePath(name));
    case 4:
      return camelCase(trimFilePath(name), true);
    default:
      return trimFilePath(name);
  }
};

export const getFileMeta = fileName => {
  const pieces = fileName.split('.');
  const type = pieces[pieces.length - 1];
  pieces.pop();
  const name = pieces.join('.');
  return {type, name};
};

export const handleWebPExportSettings = (exportSettings, exportWebP) => {
  if (!exportWebP) {
    return exportSettings;
  }
  const newExportSettings = [...exportSettings];
  exportSettings.map(exportSetting => {
    if (['PNG', 'JPG'].indexOf(exportSetting.format) > -1) {
      const {name} = getFileMeta(exportSetting.fileName);
      newExportSettings.push({...exportSetting, format: 'WEBP', fileName: `${name}.webp`});
    }
  });
  return newExportSettings;
};

// get source Code
export const getSourceCode = url =>
  fetch(url)
    .then(response => response.text())
    .catch(error => {
      console.dir(error);
      return {err: error};
    });

// get buffer data
export const getBufferData = url => {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .catch(error => {
      console.dir(error);
      return {err: error};
    });
};

export const copySomething = (text, callback?) => {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('readonly', 'readonly');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.setSelectionRange(0, 9999);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    callback && callback();
  }
  document.body.removeChild(textarea);
};

export const sliceName = name => {
  const namePieces = name.split('.');
  const format = namePieces.pop();
  return [namePieces.join('.'), format];
};

export const renameImages = names => {
  const count = {};
  const namesArray = [...names];
  namesArray.forEach(function(x, i) {
    const [m, n] = sliceName(x);
    if (namesArray.indexOf(x) !== i) {
      const c = x in count ? (count[x] = count[x] + 1) : (count[x] = 1);
      let j = c;
      let k = m + '-' + j + '.' + n;

      while (namesArray.indexOf(k) !== -1) {
        k = m + '-' + ++j + '.' + n;
      }
      namesArray[i] = k;
    }
  });
  return namesArray;
};

export const isVisibleNode = node => {
  if (node && node.parent) {
    if (node.visible && node.parent.type !== 'PAGE') {
      return isVisibleNode(node.parent);
    } else {
      return node.visible;
    }
  } else {
    return false;
  }
};
