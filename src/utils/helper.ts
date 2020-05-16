export const sendMessage = message => {
  // console.log(message.type)
  figma.ui.postMessage(message);
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const trimFilePath = filePath => filePath.replace(/\//g, '-').replace(/:/g, '-');

export const getFileName = (exportSetting, index) => {
  const {name, suffix, format, constraint} = exportSetting;
  let fileName = suffix ? `${name}-${suffix}` : name;
  if (index !== undefined) {
    fileName += `-${index}`;
  }
  const scale = format === 'SVG' ? '' : `@${constraint.value}x`;
  const fileFormat = format.toLowerCase();
  fileName = fileName.replace(/ /g, '-');
  return `${trimFilePath(fileName)}${scale}.${fileFormat}`;
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
