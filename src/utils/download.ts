import {asyncForEach, getSourceCode, getBufferData} from './helper';
const baseUrl = 'https://figmacn.com/handoff/';

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
    onPhase('processing html', 2);
    const indexSourceCode = await handleIndexHTML(zip, data);
    onPhase('processing css', 3);
    await handleCSS(zip, getStyleSrcs(indexSourceCode));
    onPhase('processing js', 5);
    await handleJs(zip, getScriptSrcs(indexSourceCode));
    onPhase('processing ico', 8);
    await handleLogo(zip, 'favicon.ico');
    onPhase('processing logo', 10);
    await handleLogo(zip, 'figmacn-logo.svg');
    await handleLogo(zip);
    onPhase('start exporting', 11);
};

// generate index.html
export const handleIndexHTML = async (zip, data) => {
    const {fileData, pagedFrames, includeComponents} = data;
    const indexSourceCode = await getSourceCode(baseUrl);
    const indexSourceCodeWithData = (indexSourceCode as string)
        .replace('PAGED_FRAMES=""', `PAGED_FRAMES = ${JSON.stringify(pagedFrames)}`)
        .replace('FILE_DATA=""', `FILE_DATA = ${JSON.stringify(fileData)}`)
        .replace('INCLUDE_COMPONENTS=0', `INCLUDE_COMPONENTS = ${includeComponents}`);
    zip.file('index.html', indexSourceCodeWithData);
    return indexSourceCode;
};

// generate js
export const handleJs = async (zip, scriptSrcs) => {
    const js = zip.folder('static/js');
    await asyncForEach(scriptSrcs, async scriptSrc => {
        if (/chunk.js$/.test(scriptSrc)) {
            const jsSource = await getSourceCode(`${baseUrl}${scriptSrc}`);
            const pieces = scriptSrc.split('/');
            js.file(pieces[pieces.length - 1], jsSource);
        }
    });
};

// generate logo.svg
export const handleLogo = async (zip, fileName = 'logo.svg') => {
    const logoData = await getBufferData(`${baseUrl}${fileName}`);
    zip.file(fileName, logoData, {base64: true});
};

// generate css
export const handleCSS = async (zip, styles) => {
    const css = zip.folder('static/css');
    await asyncForEach(styles, async styleSrc => {
        if (/chunk.css$/.test(styleSrc)) {
            const cssSource = await getSourceCode(`${baseUrl}${styleSrc}`);
            const pieces = styleSrc.split('/');
            css.file(pieces[pieces.length - 1], cssSource);
        }
    });
};
