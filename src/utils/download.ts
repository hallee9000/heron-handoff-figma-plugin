import {asyncForEach, getSourceCode, getBufferData} from './helper';

const getBaseUrl = language =>
  language === 'zh'
    ? 'https://figma-hanoff-1255718578.cos.ap-guangzhou.myqcloud.com/'
    : 'https://leadream.github.io/figma-handoff/';

export const getScriptSrcs = indexSourceCode => {
  const scripts = indexSourceCode.match(/<script src=".\/static(?:.*?)<\/script>/g);
  return scripts.map(script => script.replace('<script src="./', '').replace('"></script>', ''));
};

export const getStyleSrcs = indexSourceCode => {
  const styles = indexSourceCode.match(/<link href=".\/static(?:.*?)rel="stylesheet">/g);
  return styles.map(style => style.replace('<link href="./', '').replace('" rel="stylesheet">', ''));
};

// generate index.html
export const downloadHTMLAndAssets = async (zip, data, onPhase) => {
  const {settings} = data;
  onPhase('processing html', 2);
  const indexSourceCode = await handleIndexHTML(zip, data);
  onPhase('processing css', 3);
  await handleCSS(zip, settings.language, getStyleSrcs(indexSourceCode));
  onPhase('processing js', 5);
  await handleJs(zip, settings.language, getScriptSrcs(indexSourceCode));
  onPhase('processing ico', 8);
  await handleLogo(zip, settings.language, 'favicon.ico');
  onPhase('processing logo', 10);
  await handleLogo(zip, settings.language, 'figmacn-logo.svg');
  await handleLogo(zip, settings.language);
  onPhase('start exporting', 11);
};

// generate index.html
export const handleIndexHTML = async (zip, data) => {
  const {fileData, pagedFrames, settings} = data;
  const indexSourceCode = await getSourceCode(`${getBaseUrl(settings.language)}index.html`);
  const indexSourceCodeWithData = (indexSourceCode as string)
    .replace('PAGED_FRAMES=""', `PAGED_FRAMES = ${JSON.stringify(pagedFrames)}`)
    .replace('FILE_DATA=""', `FILE_DATA = ${JSON.stringify(fileData)}`)
    .replace('SETTINGS=""', `SETTINGS = ${JSON.stringify(settings)}`);
  zip.file('index.html', indexSourceCodeWithData);
  return indexSourceCode;
};

// generate css
export const handleCSS = async (zip, language, styles) => {
  const css = zip.folder('static/css');
  await asyncForEach(styles, async styleSrc => {
    if (/chunk.css$/.test(styleSrc)) {
      const cssSource = await getSourceCode(`${getBaseUrl(language)}${styleSrc}`);
      const pieces = styleSrc.split('/');
      css.file(pieces[pieces.length - 1], cssSource);
    }
  });
};

// generate js
export const handleJs = async (zip, language, scriptSrcs) => {
  const js = zip.folder('static/js');
  await asyncForEach(scriptSrcs, async scriptSrc => {
    if (/chunk.js$/.test(scriptSrc)) {
      const jsSource = await getSourceCode(`${getBaseUrl(language)}${scriptSrc}`);
      const pieces = scriptSrc.split('/');
      js.file(pieces[pieces.length - 1], jsSource);
    }
  });
};

// generate logo.svg
export const handleLogo = async (zip, language, fileName = 'logo.svg') => {
  const logoData = await getBufferData(`${getBaseUrl(language)}${fileName}`);
  zip.file(fileName, logoData, {base64: true});
};
