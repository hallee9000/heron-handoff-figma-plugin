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

export const getFileName = (exportSetting, index?) => {
  const {name, suffix, format, constraint} = exportSetting;
  let fileName = suffix ? `${name}-${suffix}` : name;
  if (index !== undefined) {
    fileName += `-${index}`;
  }
  const isWithoutConstraint = format === 'SVG' || format === 'PDF';
  const scale = isWithoutConstraint ? '' : `@${constraint.value}x`;
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
