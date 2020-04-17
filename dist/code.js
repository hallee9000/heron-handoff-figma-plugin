/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/controller.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/controller.ts":
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_frames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/frames */ "./src/utils/frames.ts");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helper */ "./src/utils/helper.ts");
/* harmony import */ var _utils_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/export */ "./src/utils/export.ts");
/* harmony import */ var _utils_walk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/walk */ "./src/utils/walk.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let fileData, useHDImages, includeComponents;
let frameNodes = [], exportSettingNodes = [], componentNodes = [], exportNodes = [];
figma.showUI(__html__, { width: 300, height: 480 });
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'ui:set-welcomed') {
        yield figma.clientStorage.setAsync('welcomed', true);
    }
    else if (msg.type === 'ui:get-welcomed') {
        const welcomed = yield figma.clientStorage.getAsync('welcomed');
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_1__["sendMessage"])({
            type: 'bg:welcomed-got',
            message: { welcomed },
        });
    }
    else if (msg.type === 'ui:get-frames') {
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_1__["sendMessage"])({
            type: 'bg:frames-got',
            message: {
                allFrames: Object(_utils_frames__WEBPACK_IMPORTED_MODULE_0__["getAllPagedFrames"])(figma.root),
                currentFrames: Object(_utils_frames__WEBPACK_IMPORTED_MODULE_0__["getCurrentPageFrameKeys"])(figma.currentPage),
                currentPageKey: figma.currentPage.id,
            },
        });
    }
    else if (msg.type === 'ui:get-document') {
        const { pagedFrames, selectedFrameKeys, includeComponents: withComponents, useHDImages: useHD } = msg;
        const data = Object(_utils_walk__WEBPACK_IMPORTED_MODULE_3__["walkDocument"])(figma.root, selectedFrameKeys, withComponents);
        fileData = data.fileData;
        includeComponents = withComponents;
        useHDImages = useHD;
        frameNodes = data.frameNodes;
        exportSettingNodes = data.exportSettingNodes;
        componentNodes = data.componentNodes;
        exportNodes = frameNodes.concat(exportSettingNodes, includeComponents ? componentNodes : []);
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_1__["sendMessage"])({
            type: 'bg:document-got',
            message: { fileData, pagedFrames, selectedFrameKeys, includeComponents, useHDImages },
        });
    }
    else if (msg.type === 'ui:export-image') {
        const { index } = msg;
        const { exportType, node } = exportNodes[index];
        switch (exportType) {
            case 'frame':
                yield Object(_utils_export__WEBPACK_IMPORTED_MODULE_2__["exportFrame"])(node, useHDImages);
                break;
            case 'exportSetting':
                yield Object(_utils_export__WEBPACK_IMPORTED_MODULE_2__["exportExportSetting"])(node, fileData.exportSettings, index - frameNodes.length);
                break;
            case 'component':
                yield Object(_utils_export__WEBPACK_IMPORTED_MODULE_2__["exportComponent"])(node, useHDImages);
                break;
        }
    }
});


/***/ }),

/***/ "./src/utils/export.ts":
/*!*****************************!*\
  !*** ./src/utils/export.ts ***!
  \*****************************/
/*! exports provided: exportFrame, exportExportSetting, exportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportFrame", function() { return exportFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportExportSetting", function() { return exportExportSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportComponent", function() { return exportComponent; });
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helper */ "./src/utils/helper.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const exportFrame = (frameNode, useHDImages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imgData = yield frameNode.exportAsync({
            format: 'PNG',
            constraint: {
                type: 'SCALE',
                value: useHDImages ? 2 : 1
            }
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${frameNode.id}.png`);
        const fileActualName = `${frameNode.name}.png`;
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
                fileActualName,
                fileName,
                type: 'frame'
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
const exportExportSetting = (exportNode, exportSettings, index) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exportSetting = Object.assign({}, exportSettings[index]);
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["getFileName"])(exportSetting, index);
        delete exportSetting.id;
        delete exportSetting.name;
        const imgData = yield exportNode.exportAsync(exportSetting);
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
                fileActualName: fileName,
                fileName,
                type: 'exportSetting'
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
const exportComponent = (componentNode, useHDImages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imgData = yield componentNode.exportAsync({
            format: 'PNG',
            constraint: {
                type: 'SCALE',
                value: useHDImages ? 2 : 1
            }
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${componentNode.id}.png`);
        const fileActualName = `${componentNode.name}.png`;
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
                fileActualName,
                fileName,
                type: 'component'
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});


/***/ }),

/***/ "./src/utils/frames.ts":
/*!*****************************!*\
  !*** ./src/utils/frames.ts ***!
  \*****************************/
/*! exports provided: getFlattenedFrameKeys, getSelectedPagedFrames, getPageKeys, getAllPagedFrames, getCurrentPageFrameKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFlattenedFrameKeys", function() { return getFlattenedFrameKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedPagedFrames", function() { return getSelectedPagedFrames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageKeys", function() { return getPageKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPagedFrames", function() { return getAllPagedFrames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageFrameKeys", function() { return getCurrentPageFrameKeys; });
const getFlattenedFrameKeys = (pagedFrames, checkedKeys) => {
    const frameKeys = [];
    pagedFrames.map(({ children }) => {
        children
            .filter(({ key }) => (checkedKeys ? checkedKeys.indexOf(key) > -1 : true))
            .map(({ key }) => {
            frameKeys.push(key);
        });
    });
    return frameKeys;
};
const getSelectedPagedFrames = (frames, checkedKeys) => {
    const pagedFrames = {};
    frames.map(({ key, title, children }) => {
        const selectedFrames = children.filter(({ key }) => checkedKeys.indexOf(key) > -1);
        if (selectedFrames.length) {
            pagedFrames[key] = {
                name: title,
                frames: selectedFrames.map(({ key, title }) => ({
                    id: key,
                    name: title,
                })),
            };
        }
    });
    return pagedFrames;
};
const getPageKeys = frames => {
    const pageKeys = frames.map(({ key }) => key);
    return pageKeys;
};
const getAllPagedFrames = document => document.children
    .map(page => ({
    key: page.id,
    title: page.name,
    children: page.children
        .filter(({ type, visible }) => type === 'FRAME' && visible)
        .map(frame => ({
        key: frame.id,
        title: frame.name,
    }))
        .reverse(),
}))
    .filter(page => !!page.children.length);
const getCurrentPageFrameKeys = currentPage => currentPage.children.filter(({ type, visible }) => type === 'FRAME' && visible).map(frame => frame.id);


/***/ }),

/***/ "./src/utils/helper.ts":
/*!*****************************!*\
  !*** ./src/utils/helper.ts ***!
  \*****************************/
/*! exports provided: sendMessage, asyncForEach, trimFilePath, getFileName, getSourceCode, getBufferData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessage", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncForEach", function() { return asyncForEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimFilePath", function() { return trimFilePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileName", function() { return getFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSourceCode", function() { return getSourceCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBufferData", function() { return getBufferData; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sendMessage = message => {
    figma.ui.postMessage(message);
};
const asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
const trimFilePath = filePath => filePath.replace(/\//g, '-').replace(/:/g, '-');
const getFileName = (exportSetting, index) => {
    const { name, suffix, format, constraint } = exportSetting;
    let fileName = suffix ? `${name}-${suffix}` : name;
    if (index !== undefined) {
        fileName += `-${index}`;
    }
    const scale = format === 'SVG' ? '' : `@${constraint.value}x`;
    const fileFormat = format.toLowerCase();
    fileName = fileName.replace(/ /g, '-');
    return `${trimFilePath(fileName)}${scale}.${fileFormat}`;
};
const getSourceCode = url => fetch(url)
    .then(response => response.text())
    .catch(error => {
    console.dir(error);
    return { err: error };
});
const getBufferData = url => {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .catch(error => {
        console.dir(error);
        return { err: error };
    });
};


/***/ }),

/***/ "./src/utils/style.ts":
/*!****************************!*\
  !*** ./src/utils/style.ts ***!
  \****************************/
/*! exports provided: getFillStyle, getTextStyle, getEffectStyle, getGridStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFillStyle", function() { return getFillStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextStyle", function() { return getTextStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEffectStyle", function() { return getEffectStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGridStyle", function() { return getGridStyle; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/utils/text.ts");

const getFillStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'FILL',
    items: style.paints,
});
const getTextStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'TEXT',
    items: {
        fontSize: style.fontSize,
        fontFamily: style.fontName.family,
        fontWeight: _text__WEBPACK_IMPORTED_MODULE_0__["FONT_WEIGHTS"][style.fontName.style] || style.fontName.style,
        textDecoration: style.textDecoration,
        letterSpacing: style.letterSpacing.value,
        letterSpacingUnit: style.letterSpacing.unit,
        lineHeight: style.lineHeight.value,
        lineHeightUnit: style.lineHeight.unit,
    },
});
const getEffectStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'EFFECT',
    items: style.effects,
});
const getGridStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'GRID',
    items: style.layoutGrids,
});


/***/ }),

/***/ "./src/utils/text.ts":
/*!***************************!*\
  !*** ./src/utils/text.ts ***!
  \***************************/
/*! exports provided: FONT_WEIGHTS, compareStyles, hasSymbolProperties, hasEqualProperties, getSingleTextStyle, getTextNodeStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FONT_WEIGHTS", function() { return FONT_WEIGHTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareStyles", function() { return compareStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasSymbolProperties", function() { return hasSymbolProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasEqualProperties", function() { return hasEqualProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSingleTextStyle", function() { return getSingleTextStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextNodeStyle", function() { return getTextNodeStyle; });
const FONT_WEIGHTS = {
    Ultralight: 'ultralight',
    '100': 'ultralight',
    Thin: 'thin',
    '200': 'thin',
    Light: 'light',
    '300': 'light',
    Normal: 'regular',
    Regular: 'regular',
    '400': 'regular',
    Medium: 'medium',
    Semibold: 'semibold',
    Demibold: 'semibold',
    '500': 'semibold',
    '600': 'semibold',
    Bold: 'bold',
    '700': 'bold',
    Extrabold: 'heavy',
    Ultrabold: 'heavy',
    Heavy: 'heavy',
    '800': 'heavy',
    Black: 'black',
    '900': 'bacl',
};
const compareStyles = (style1, style2) => {
    const props1 = Object.getOwnPropertyNames(style1);
    const props2 = Object.getOwnPropertyNames(style2);
    if (props1.length !== props2.length)
        return false;
    for (const p in style1) {
        if (style1.hasOwnProperty(p) !== style2.hasOwnProperty(p))
            return false;
        switch (typeof style1[p]) {
            case 'object':
                if (!compareStyles(style1[p], style2[p]))
                    return false;
                break;
            default:
                if (style1[p] !== style2[p])
                    return false;
        }
    }
    return true;
};
const hasSymbolProperties = textNode => {
    const { fontName, fontSize, lineHeight, textDecoration, letterSpacing, fills } = textNode;
    return !![fontName, fontSize, lineHeight, textDecoration, letterSpacing, fills].filter(arg => typeof arg === 'symbol').length;
};
const hasEqualProperties = (style, anotherStyle) => {
    if (style.fillStyleId &&
        anotherStyle.fillStyleId &&
        style.textStyleId &&
        anotherStyle.textStyleId &&
        style.fillStyleId === anotherStyle.fillStyleId &&
        style.textStyleId === anotherStyle.textStyleId) {
        return true;
    }
    else if (!style.fillStyleId &&
        !anotherStyle.fillStyleId &&
        !style.textStyleId &&
        !anotherStyle.textStyleId) {
        const isTheSame = compareStyles(style, anotherStyle);
        return isTheSame;
    }
    else {
        return false;
    }
};
const getSingleTextStyle = (textNode, index) => {
    const fillStyleId = index === undefined ? textNode.fillStyleId : textNode.getRangeFillStyleId(index, index + 1);
    const textStyleId = index === undefined ? textNode.textStyleId : textNode.getRangeTextStyleId(index, index + 1);
    const fontSize = index === undefined ? textNode.fontSize : textNode.getRangeFontSize(index, index + 1);
    const fontName = index === undefined ? textNode.fontName : textNode.getRangeFontName(index, index + 1);
    const textDecoration = index === undefined ? textNode.textDecoration : textNode.getRangeTextDecoration(index, index + 1);
    const letterSpacing = index === undefined ? textNode.letterSpacing : textNode.getRangeLetterSpacing(index, index + 1);
    const lineHeight = index === undefined ? textNode.lineHeight : textNode.getRangeLineHeight(index, index + 1);
    const fills = index === undefined ? textNode.fills : textNode.getRangeFills(index, index + 1);
    return {
        fillStyleId,
        textStyleId,
        fontSize,
        fontFamily: fontName.family,
        fontWeight: FONT_WEIGHTS[fontName.style] || fontName.style,
        textDecoration,
        letterSpacing: letterSpacing.value,
        letterSpacingUnit: letterSpacing.unit,
        lineHeight: lineHeight.value,
        lineHeightUnit: lineHeight.unit,
        fills,
        textAlignHorizontal: textNode.textAlignHorizontal,
        textAlignVertical: textNode.textAlignVertical,
    };
};
const getTextNodeStyle = textNode => {
    if (hasSymbolProperties(textNode)) {
        const textTable = [];
        let currentTextStyle;
        Array.prototype.map.call(textNode.characters, (character, index) => {
            if (index === 0) {
                currentTextStyle = getSingleTextStyle(textNode, index);
                textTable.push(Object.assign({ text: character }, currentTextStyle));
            }
            else {
                const lastestTextStyle = getSingleTextStyle(textNode, index);
                const textTableLength = textTable.length;
                if (hasEqualProperties(currentTextStyle, lastestTextStyle)) {
                    textTable[textTableLength - 1].text += character;
                }
                else {
                    textTable.push(Object.assign({ text: character }, lastestTextStyle));
                }
                currentTextStyle = lastestTextStyle;
            }
        });
        return textTable;
    }
    else {
        return getSingleTextStyle(textNode);
    }
};


/***/ }),

/***/ "./src/utils/walk.ts":
/*!***************************!*\
  !*** ./src/utils/walk.ts ***!
  \***************************/
/*! exports provided: walkDocument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "walkDocument", function() { return walkDocument; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/utils/text.ts");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/utils/style.ts");


const nodeTypeMaps = {
    POLYGON: 'REGULAR_POLYGON',
    PAGE: 'CANVAS'
};
const getStyles = node => {
    if (!node.fillStyleId && !node.textStyleId && !node.strokeStyleId && !node.effectStyleId) {
        return false;
    }
    const styles = {};
    node.fillStyleId && typeof node.fillStyleId !== 'symbol' && (styles.fill = node.fillStyleId);
    node.textStyleId && typeof node.textStyleId !== 'symbol' && (styles.text = node.textStyleId);
    node.strokeStyleId && (styles.stroke = node.strokeStyleId);
    node.effectStyleId && (styles.effect = node.effectStyleId);
    return styles;
};
const assignProperties = (treeNode, node) => {
    const allowedProperties = [
        'visible',
        'locked',
        'blendMode',
        'size',
        'clipsContent',
        'relativeTransform',
        'effects',
        'isMask',
        'isMaskOutline',
        'booleanOperation'
    ];
    if (node.opacity !== 1 && node.opacity !== undefined) {
        treeNode.opacity = node.opacity;
    }
    allowedProperties.map(property => {
        if (node[property] !== undefined) {
            treeNode[property] = node[property];
        }
    });
};
const handleExportSettings = (treeNode, node, callback) => {
    if (node.exportSettings) {
        treeNode.exportSettings = node.exportSettings;
        if (node.exportSettings.length) {
            callback && callback(node.exportSettings);
        }
    }
};
const handleBoundingBox = (treeNode, node, type) => {
    if (type !== 'CANVAS' && type !== 'DOCUMENT') {
        treeNode.absoluteBoundingBox = {
            x: node.absoluteTransform[0][2],
            y: node.absoluteTransform[1][2],
            width: node.width,
            height: node.height
        };
    }
};
const handleCornerRadius = (treeNode, node) => {
    if (node.cornerRadius) {
        if (typeof node.cornerRadius === 'number') {
            treeNode.cornerRadius = node.cornerRadius;
            treeNode.rectangleCornerRadii = Array.from(Array(4), () => node.cornerRadius);
        }
        else {
            treeNode.rectangleCornerRadii = [
                node.topLeftRadius,
                node.topRightRadius,
                node.bottomRightRadius,
                node.bottomLeftRadius
            ];
        }
    }
};
const handleStyle = (treeNode, node) => {
    if (node.fills !== undefined && typeof node.fills !== 'symbol') {
        treeNode.fills = node.fills;
    }
    if (node.strokes !== undefined) {
        treeNode.strokes = node.strokes;
        treeNode.strokeWeight = treeNode.strokeWeight !== undefined ? treeNode.strokeWeight : 1;
        treeNode.strokeAlign = treeNode.strokeAlign || 'INSIDE';
    }
    const styles = getStyles(node);
    if (styles) {
        treeNode.styles = styles;
    }
};
const handleSpecialNode = (treeNode, node, type) => {
    switch (type) {
        case 'CANVAS':
            treeNode.backgroundColor = node.backgrounds[0];
            break;
        case 'TEXT':
            treeNode.characters = node.characters;
            const textStyle = Object(_text__WEBPACK_IMPORTED_MODULE_0__["getTextNodeStyle"])(node);
            const isMixedText = Array.isArray(textStyle);
            treeNode.isMixedText = isMixedText;
            if (isMixedText) {
                const firstStyle = Object.assign({}, textStyle[0]);
                delete firstStyle.text;
                treeNode.style = firstStyle;
                treeNode.textTable = textStyle;
                treeNode.fills = textStyle[0].fills;
            }
            else {
                treeNode.textTable = [];
                treeNode.style = textStyle;
            }
            break;
        case 'INSTANCE':
            try {
                treeNode.componentId = node.masterComponent.id;
            }
            catch (err) {
                console.log(err);
            }
            break;
    }
};
const walkDocument = (document, selectedFrameKeys, includeComponents) => {
    const fileData = {
        isFromPlugin: true,
        name: document.name,
        document: {}
    };
    let componentNodes = [];
    const frameNodes = [];
    const exportSettingNodes = [];
    const exportSettings = [];
    const step = (node, isSteppingComponent) => {
        const type = nodeTypeMaps[node.type] || node.type;
        const treeNode = {
            id: node.id,
            name: node.name,
            type
        };
        assignProperties(treeNode, node);
        handleSpecialNode(treeNode, node, type);
        handleStyle(treeNode, node);
        handleCornerRadius(treeNode, node);
        handleBoundingBox(treeNode, node, type);
        handleExportSettings(treeNode, node, imageExportSettings => {
            if (!isSteppingComponent && node.visible) {
                imageExportSettings.map(imageExportSetting => {
                    exportSettingNodes.push({ exportType: 'exportSetting', node });
                    exportSettings.push(Object.assign(Object.assign({}, imageExportSetting), { id: node.id, name: node.name }));
                });
            }
        });
        if (node.children) {
            treeNode.children = node.children
                .filter(node => {
                const isArtboard = node.parent.type === 'PAGE' && node.type === 'FRAME';
                isArtboard && selectedFrameKeys.indexOf(node.id) > -1 && frameNodes.push({ exportType: 'frame', node });
                return isArtboard ? selectedFrameKeys.indexOf(node.id) > -1 : node.parent.type !== 'PAGE';
            })
                .map(node => step(node));
        }
        return treeNode;
    };
    fileData.styles = {
        FILL: figma.getLocalPaintStyles().map(style => Object(_style__WEBPACK_IMPORTED_MODULE_1__["getFillStyle"])(style)),
        TEXT: figma.getLocalTextStyles().map(style => Object(_style__WEBPACK_IMPORTED_MODULE_1__["getTextStyle"])(style)),
        EFFECT: figma.getLocalEffectStyles().map(style => Object(_style__WEBPACK_IMPORTED_MODULE_1__["getEffectStyle"])(style)),
        GRID: figma.getLocalGridStyles().map(style => Object(_style__WEBPACK_IMPORTED_MODULE_1__["getGridStyle"])(style))
    };
    componentNodes = document
        .findAll(c => c.type === 'COMPONENT' && c.visible)
        .map(node => ({ exportType: 'component', node }));
    fileData.components = componentNodes.map(({ node }) => includeComponents ? step(node, true) : { id: node.id, name: node.name, description: node.description });
    fileData.document = step(document);
    fileData.exportSettings = exportSettings;
    return { fileData, frameNodes, exportSettingNodes, componentNodes };
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9leHBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2ZyYW1lcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvd2Fsay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxF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aks7QUFDQTtBQUNBLFlBQVk7QUFDWiIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGx1Z2luL2NvbnRyb2xsZXIudHNcIik7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGdldEFsbFBhZ2VkRnJhbWVzLCBnZXRDdXJyZW50UGFnZUZyYW1lS2V5cyB9IGZyb20gJy4uL3V0aWxzL2ZyYW1lcyc7XG5pbXBvcnQgeyBzZW5kTWVzc2FnZSB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcic7XG5pbXBvcnQgeyBleHBvcnRGcmFtZSwgZXhwb3J0Q29tcG9uZW50LCBleHBvcnRFeHBvcnRTZXR0aW5nIH0gZnJvbSAnLi4vdXRpbHMvZXhwb3J0JztcbmltcG9ydCB7IHdhbGtEb2N1bWVudCB9IGZyb20gJy4uL3V0aWxzL3dhbGsnO1xubGV0IGZpbGVEYXRhLCB1c2VIREltYWdlcywgaW5jbHVkZUNvbXBvbmVudHM7XG5sZXQgZnJhbWVOb2RlcyA9IFtdLCBleHBvcnRTZXR0aW5nTm9kZXMgPSBbXSwgY29tcG9uZW50Tm9kZXMgPSBbXSwgZXhwb3J0Tm9kZXMgPSBbXTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogMzAwLCBoZWlnaHQ6IDQ4MCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ3VpOnNldC13ZWxjb21lZCcpIHtcbiAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnd2VsY29tZWQnLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1aTpnZXQtd2VsY29tZWQnKSB7XG4gICAgICAgIGNvbnN0IHdlbGNvbWVkID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygnd2VsY29tZWQnKTtcbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2JnOndlbGNvbWVkLWdvdCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7IHdlbGNvbWVkIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3VpOmdldC1mcmFtZXMnKSB7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzpmcmFtZXMtZ290JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBhbGxGcmFtZXM6IGdldEFsbFBhZ2VkRnJhbWVzKGZpZ21hLnJvb3QpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRGcmFtZXM6IGdldEN1cnJlbnRQYWdlRnJhbWVLZXlzKGZpZ21hLmN1cnJlbnRQYWdlKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZUtleTogZmlnbWEuY3VycmVudFBhZ2UuaWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1aTpnZXQtZG9jdW1lbnQnKSB7XG4gICAgICAgIGNvbnN0IHsgcGFnZWRGcmFtZXMsIHNlbGVjdGVkRnJhbWVLZXlzLCBpbmNsdWRlQ29tcG9uZW50czogd2l0aENvbXBvbmVudHMsIHVzZUhESW1hZ2VzOiB1c2VIRCB9ID0gbXNnO1xuICAgICAgICBjb25zdCBkYXRhID0gd2Fsa0RvY3VtZW50KGZpZ21hLnJvb3QsIHNlbGVjdGVkRnJhbWVLZXlzLCB3aXRoQ29tcG9uZW50cyk7XG4gICAgICAgIGZpbGVEYXRhID0gZGF0YS5maWxlRGF0YTtcbiAgICAgICAgaW5jbHVkZUNvbXBvbmVudHMgPSB3aXRoQ29tcG9uZW50cztcbiAgICAgICAgdXNlSERJbWFnZXMgPSB1c2VIRDtcbiAgICAgICAgZnJhbWVOb2RlcyA9IGRhdGEuZnJhbWVOb2RlcztcbiAgICAgICAgZXhwb3J0U2V0dGluZ05vZGVzID0gZGF0YS5leHBvcnRTZXR0aW5nTm9kZXM7XG4gICAgICAgIGNvbXBvbmVudE5vZGVzID0gZGF0YS5jb21wb25lbnROb2RlcztcbiAgICAgICAgZXhwb3J0Tm9kZXMgPSBmcmFtZU5vZGVzLmNvbmNhdChleHBvcnRTZXR0aW5nTm9kZXMsIGluY2x1ZGVDb21wb25lbnRzID8gY29tcG9uZW50Tm9kZXMgOiBbXSk7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzpkb2N1bWVudC1nb3QnLFxuICAgICAgICAgICAgbWVzc2FnZTogeyBmaWxlRGF0YSwgcGFnZWRGcmFtZXMsIHNlbGVjdGVkRnJhbWVLZXlzLCBpbmNsdWRlQ29tcG9uZW50cywgdXNlSERJbWFnZXMgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAndWk6ZXhwb3J0LWltYWdlJykge1xuICAgICAgICBjb25zdCB7IGluZGV4IH0gPSBtc2c7XG4gICAgICAgIGNvbnN0IHsgZXhwb3J0VHlwZSwgbm9kZSB9ID0gZXhwb3J0Tm9kZXNbaW5kZXhdO1xuICAgICAgICBzd2l0Y2ggKGV4cG9ydFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ZyYW1lJzpcbiAgICAgICAgICAgICAgICB5aWVsZCBleHBvcnRGcmFtZShub2RlLCB1c2VIREltYWdlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdleHBvcnRTZXR0aW5nJzpcbiAgICAgICAgICAgICAgICB5aWVsZCBleHBvcnRFeHBvcnRTZXR0aW5nKG5vZGUsIGZpbGVEYXRhLmV4cG9ydFNldHRpbmdzLCBpbmRleCAtIGZyYW1lTm9kZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NvbXBvbmVudCc6XG4gICAgICAgICAgICAgICAgeWllbGQgZXhwb3J0Q29tcG9uZW50KG5vZGUsIHVzZUhESW1hZ2VzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBzZW5kTWVzc2FnZSwgdHJpbUZpbGVQYXRoLCBnZXRGaWxlTmFtZSB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcic7XG5leHBvcnQgY29uc3QgZXhwb3J0RnJhbWUgPSAoZnJhbWVOb2RlLCB1c2VIREltYWdlcykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IHlpZWxkIGZyYW1lTm9kZS5leHBvcnRBc3luYyh7XG4gICAgICAgICAgICBmb3JtYXQ6ICdQTkcnLFxuICAgICAgICAgICAgY29uc3RyYWludDoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdTQ0FMRScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVzZUhESW1hZ2VzID8gMiA6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdHJpbUZpbGVQYXRoKGAke2ZyYW1lTm9kZS5pZH0ucG5nYCk7XG4gICAgICAgIGNvbnN0IGZpbGVBY3R1YWxOYW1lID0gYCR7ZnJhbWVOb2RlLm5hbWV9LnBuZ2A7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzppbWFnZS1leHBvcnRlZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlQWN0dWFsTmFtZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZnJhbWUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgZXhwb3J0RXhwb3J0U2V0dGluZyA9IChleHBvcnROb2RlLCBleHBvcnRTZXR0aW5ncywgaW5kZXgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGV4cG9ydFNldHRpbmcgPSBPYmplY3QuYXNzaWduKHt9LCBleHBvcnRTZXR0aW5nc1tpbmRleF0pO1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGdldEZpbGVOYW1lKGV4cG9ydFNldHRpbmcsIGluZGV4KTtcbiAgICAgICAgZGVsZXRlIGV4cG9ydFNldHRpbmcuaWQ7XG4gICAgICAgIGRlbGV0ZSBleHBvcnRTZXR0aW5nLm5hbWU7XG4gICAgICAgIGNvbnN0IGltZ0RhdGEgPSB5aWVsZCBleHBvcnROb2RlLmV4cG9ydEFzeW5jKGV4cG9ydFNldHRpbmcpO1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6aW1hZ2UtZXhwb3J0ZWQnLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGltZ0RhdGEsXG4gICAgICAgICAgICAgICAgZmlsZUFjdHVhbE5hbWU6IGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdleHBvcnRTZXR0aW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IGV4cG9ydENvbXBvbmVudCA9IChjb21wb25lbnROb2RlLCB1c2VIREltYWdlcykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IHlpZWxkIGNvbXBvbmVudE5vZGUuZXhwb3J0QXN5bmMoe1xuICAgICAgICAgICAgZm9ybWF0OiAnUE5HJyxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnU0NBTEUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1c2VIREltYWdlcyA/IDIgOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRyaW1GaWxlUGF0aChgJHtjb21wb25lbnROb2RlLmlkfS5wbmdgKTtcbiAgICAgICAgY29uc3QgZmlsZUFjdHVhbE5hbWUgPSBgJHtjb21wb25lbnROb2RlLm5hbWV9LnBuZ2A7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzppbWFnZS1leHBvcnRlZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlQWN0dWFsTmFtZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29tcG9uZW50J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0pO1xuIiwiZXhwb3J0IGNvbnN0IGdldEZsYXR0ZW5lZEZyYW1lS2V5cyA9IChwYWdlZEZyYW1lcywgY2hlY2tlZEtleXMpID0+IHtcbiAgICBjb25zdCBmcmFtZUtleXMgPSBbXTtcbiAgICBwYWdlZEZyYW1lcy5tYXAoKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgLmZpbHRlcigoeyBrZXkgfSkgPT4gKGNoZWNrZWRLZXlzID8gY2hlY2tlZEtleXMuaW5kZXhPZihrZXkpID4gLTEgOiB0cnVlKSlcbiAgICAgICAgICAgIC5tYXAoKHsga2V5IH0pID0+IHtcbiAgICAgICAgICAgIGZyYW1lS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBmcmFtZUtleXM7XG59O1xuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkUGFnZWRGcmFtZXMgPSAoZnJhbWVzLCBjaGVja2VkS2V5cykgPT4ge1xuICAgIGNvbnN0IHBhZ2VkRnJhbWVzID0ge307XG4gICAgZnJhbWVzLm1hcCgoeyBrZXksIHRpdGxlLCBjaGlsZHJlbiB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRnJhbWVzID0gY2hpbGRyZW4uZmlsdGVyKCh7IGtleSB9KSA9PiBjaGVja2VkS2V5cy5pbmRleE9mKGtleSkgPiAtMSk7XG4gICAgICAgIGlmIChzZWxlY3RlZEZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhZ2VkRnJhbWVzW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgZnJhbWVzOiBzZWxlY3RlZEZyYW1lcy5tYXAoKHsga2V5LCB0aXRsZSB9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBpZDoga2V5LFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aXRsZSxcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhZ2VkRnJhbWVzO1xufTtcbmV4cG9ydCBjb25zdCBnZXRQYWdlS2V5cyA9IGZyYW1lcyA9PiB7XG4gICAgY29uc3QgcGFnZUtleXMgPSBmcmFtZXMubWFwKCh7IGtleSB9KSA9PiBrZXkpO1xuICAgIHJldHVybiBwYWdlS2V5cztcbn07XG5leHBvcnQgY29uc3QgZ2V0QWxsUGFnZWRGcmFtZXMgPSBkb2N1bWVudCA9PiBkb2N1bWVudC5jaGlsZHJlblxuICAgIC5tYXAocGFnZSA9PiAoe1xuICAgIGtleTogcGFnZS5pZCxcbiAgICB0aXRsZTogcGFnZS5uYW1lLFxuICAgIGNoaWxkcmVuOiBwYWdlLmNoaWxkcmVuXG4gICAgICAgIC5maWx0ZXIoKHsgdHlwZSwgdmlzaWJsZSB9KSA9PiB0eXBlID09PSAnRlJBTUUnICYmIHZpc2libGUpXG4gICAgICAgIC5tYXAoZnJhbWUgPT4gKHtcbiAgICAgICAga2V5OiBmcmFtZS5pZCxcbiAgICAgICAgdGl0bGU6IGZyYW1lLm5hbWUsXG4gICAgfSkpXG4gICAgICAgIC5yZXZlcnNlKCksXG59KSlcbiAgICAuZmlsdGVyKHBhZ2UgPT4gISFwYWdlLmNoaWxkcmVuLmxlbmd0aCk7XG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFBhZ2VGcmFtZUtleXMgPSBjdXJyZW50UGFnZSA9PiBjdXJyZW50UGFnZS5jaGlsZHJlbi5maWx0ZXIoKHsgdHlwZSwgdmlzaWJsZSB9KSA9PiB0eXBlID09PSAnRlJBTUUnICYmIHZpc2libGUpLm1hcChmcmFtZSA9PiBmcmFtZS5pZCk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBzZW5kTWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufTtcbmV4cG9ydCBjb25zdCBhc3luY0ZvckVhY2ggPSAoYXJyYXksIGNhbGxiYWNrKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHlpZWxkIGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCB0cmltRmlsZVBhdGggPSBmaWxlUGF0aCA9PiBmaWxlUGF0aC5yZXBsYWNlKC9cXC8vZywgJy0nKS5yZXBsYWNlKC86L2csICctJyk7XG5leHBvcnQgY29uc3QgZ2V0RmlsZU5hbWUgPSAoZXhwb3J0U2V0dGluZywgaW5kZXgpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHN1ZmZpeCwgZm9ybWF0LCBjb25zdHJhaW50IH0gPSBleHBvcnRTZXR0aW5nO1xuICAgIGxldCBmaWxlTmFtZSA9IHN1ZmZpeCA/IGAke25hbWV9LSR7c3VmZml4fWAgOiBuYW1lO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpbGVOYW1lICs9IGAtJHtpbmRleH1gO1xuICAgIH1cbiAgICBjb25zdCBzY2FsZSA9IGZvcm1hdCA9PT0gJ1NWRycgPyAnJyA6IGBAJHtjb25zdHJhaW50LnZhbHVlfXhgO1xuICAgIGNvbnN0IGZpbGVGb3JtYXQgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcbiAgICBmaWxlTmFtZSA9IGZpbGVOYW1lLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICByZXR1cm4gYCR7dHJpbUZpbGVQYXRoKGZpbGVOYW1lKX0ke3NjYWxlfS4ke2ZpbGVGb3JtYXR9YDtcbn07XG5leHBvcnQgY29uc3QgZ2V0U291cmNlQ29kZSA9IHVybCA9PiBmZXRjaCh1cmwpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgIHJldHVybiB7IGVycjogZXJyb3IgfTtcbn0pO1xuZXhwb3J0IGNvbnN0IGdldEJ1ZmZlckRhdGEgPSB1cmwgPT4ge1xuICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgZXJyOiBlcnJvciB9O1xuICAgIH0pO1xufTtcbiIsImltcG9ydCB7IEZPTlRfV0VJR0hUUyB9IGZyb20gJy4vdGV4dCc7XG5leHBvcnQgY29uc3QgZ2V0RmlsbFN0eWxlID0gc3R5bGUgPT4gKHtcbiAgICBpZDogc3R5bGUuaWQsXG4gICAga2V5OiBzdHlsZS5rZXksXG4gICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgc3R5bGVUeXBlOiAnRklMTCcsXG4gICAgaXRlbXM6IHN0eWxlLnBhaW50cyxcbn0pO1xuZXhwb3J0IGNvbnN0IGdldFRleHRTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ1RFWFQnLFxuICAgIGl0ZW1zOiB7XG4gICAgICAgIGZvbnRTaXplOiBzdHlsZS5mb250U2l6ZSxcbiAgICAgICAgZm9udEZhbWlseTogc3R5bGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICBmb250V2VpZ2h0OiBGT05UX1dFSUdIVFNbc3R5bGUuZm9udE5hbWUuc3R5bGVdIHx8IHN0eWxlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICB0ZXh0RGVjb3JhdGlvbjogc3R5bGUudGV4dERlY29yYXRpb24sXG4gICAgICAgIGxldHRlclNwYWNpbmc6IHN0eWxlLmxldHRlclNwYWNpbmcudmFsdWUsXG4gICAgICAgIGxldHRlclNwYWNpbmdVbml0OiBzdHlsZS5sZXR0ZXJTcGFjaW5nLnVuaXQsXG4gICAgICAgIGxpbmVIZWlnaHQ6IHN0eWxlLmxpbmVIZWlnaHQudmFsdWUsXG4gICAgICAgIGxpbmVIZWlnaHRVbml0OiBzdHlsZS5saW5lSGVpZ2h0LnVuaXQsXG4gICAgfSxcbn0pO1xuZXhwb3J0IGNvbnN0IGdldEVmZmVjdFN0eWxlID0gc3R5bGUgPT4gKHtcbiAgICBpZDogc3R5bGUuaWQsXG4gICAga2V5OiBzdHlsZS5rZXksXG4gICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgc3R5bGVUeXBlOiAnRUZGRUNUJyxcbiAgICBpdGVtczogc3R5bGUuZWZmZWN0cyxcbn0pO1xuZXhwb3J0IGNvbnN0IGdldEdyaWRTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ0dSSUQnLFxuICAgIGl0ZW1zOiBzdHlsZS5sYXlvdXRHcmlkcyxcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IEZPTlRfV0VJR0hUUyA9IHtcbiAgICBVbHRyYWxpZ2h0OiAndWx0cmFsaWdodCcsXG4gICAgJzEwMCc6ICd1bHRyYWxpZ2h0JyxcbiAgICBUaGluOiAndGhpbicsXG4gICAgJzIwMCc6ICd0aGluJyxcbiAgICBMaWdodDogJ2xpZ2h0JyxcbiAgICAnMzAwJzogJ2xpZ2h0JyxcbiAgICBOb3JtYWw6ICdyZWd1bGFyJyxcbiAgICBSZWd1bGFyOiAncmVndWxhcicsXG4gICAgJzQwMCc6ICdyZWd1bGFyJyxcbiAgICBNZWRpdW06ICdtZWRpdW0nLFxuICAgIFNlbWlib2xkOiAnc2VtaWJvbGQnLFxuICAgIERlbWlib2xkOiAnc2VtaWJvbGQnLFxuICAgICc1MDAnOiAnc2VtaWJvbGQnLFxuICAgICc2MDAnOiAnc2VtaWJvbGQnLFxuICAgIEJvbGQ6ICdib2xkJyxcbiAgICAnNzAwJzogJ2JvbGQnLFxuICAgIEV4dHJhYm9sZDogJ2hlYXZ5JyxcbiAgICBVbHRyYWJvbGQ6ICdoZWF2eScsXG4gICAgSGVhdnk6ICdoZWF2eScsXG4gICAgJzgwMCc6ICdoZWF2eScsXG4gICAgQmxhY2s6ICdibGFjaycsXG4gICAgJzkwMCc6ICdiYWNsJyxcbn07XG5leHBvcnQgY29uc3QgY29tcGFyZVN0eWxlcyA9IChzdHlsZTEsIHN0eWxlMikgPT4ge1xuICAgIGNvbnN0IHByb3BzMSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN0eWxlMSk7XG4gICAgY29uc3QgcHJvcHMyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3R5bGUyKTtcbiAgICBpZiAocHJvcHMxLmxlbmd0aCAhPT0gcHJvcHMyLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoY29uc3QgcCBpbiBzdHlsZTEpIHtcbiAgICAgICAgaWYgKHN0eWxlMS5oYXNPd25Qcm9wZXJ0eShwKSAhPT0gc3R5bGUyLmhhc093blByb3BlcnR5KHApKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzdHlsZTFbcF0pIHtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wYXJlU3R5bGVzKHN0eWxlMVtwXSwgc3R5bGUyW3BdKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUxW3BdICE9PSBzdHlsZTJbcF0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnQgY29uc3QgaGFzU3ltYm9sUHJvcGVydGllcyA9IHRleHROb2RlID0+IHtcbiAgICBjb25zdCB7IGZvbnROYW1lLCBmb250U2l6ZSwgbGluZUhlaWdodCwgdGV4dERlY29yYXRpb24sIGxldHRlclNwYWNpbmcsIGZpbGxzIH0gPSB0ZXh0Tm9kZTtcbiAgICByZXR1cm4gISFbZm9udE5hbWUsIGZvbnRTaXplLCBsaW5lSGVpZ2h0LCB0ZXh0RGVjb3JhdGlvbiwgbGV0dGVyU3BhY2luZywgZmlsbHNdLmZpbHRlcihhcmcgPT4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcpLmxlbmd0aDtcbn07XG5leHBvcnQgY29uc3QgaGFzRXF1YWxQcm9wZXJ0aWVzID0gKHN0eWxlLCBhbm90aGVyU3R5bGUpID0+IHtcbiAgICBpZiAoc3R5bGUuZmlsbFN0eWxlSWQgJiZcbiAgICAgICAgYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgIHN0eWxlLnRleHRTdHlsZUlkICYmXG4gICAgICAgIGFub3RoZXJTdHlsZS50ZXh0U3R5bGVJZCAmJlxuICAgICAgICBzdHlsZS5maWxsU3R5bGVJZCA9PT0gYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgIHN0eWxlLnRleHRTdHlsZUlkID09PSBhbm90aGVyU3R5bGUudGV4dFN0eWxlSWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFzdHlsZS5maWxsU3R5bGVJZCAmJlxuICAgICAgICAhYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgICFzdHlsZS50ZXh0U3R5bGVJZCAmJlxuICAgICAgICAhYW5vdGhlclN0eWxlLnRleHRTdHlsZUlkKSB7XG4gICAgICAgIGNvbnN0IGlzVGhlU2FtZSA9IGNvbXBhcmVTdHlsZXMoc3R5bGUsIGFub3RoZXJTdHlsZSk7XG4gICAgICAgIHJldHVybiBpc1RoZVNhbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVUZXh0U3R5bGUgPSAodGV4dE5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZmlsbFN0eWxlSWQgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUuZmlsbFN0eWxlSWQgOiB0ZXh0Tm9kZS5nZXRSYW5nZUZpbGxTdHlsZUlkKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IHRleHRTdHlsZUlkID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLnRleHRTdHlsZUlkIDogdGV4dE5vZGUuZ2V0UmFuZ2VUZXh0U3R5bGVJZChpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5mb250U2l6ZSA6IHRleHROb2RlLmdldFJhbmdlRm9udFNpemUoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgZm9udE5hbWUgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUuZm9udE5hbWUgOiB0ZXh0Tm9kZS5nZXRSYW5nZUZvbnROYW1lKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IHRleHREZWNvcmF0aW9uID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLnRleHREZWNvcmF0aW9uIDogdGV4dE5vZGUuZ2V0UmFuZ2VUZXh0RGVjb3JhdGlvbihpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBsZXR0ZXJTcGFjaW5nID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmxldHRlclNwYWNpbmcgOiB0ZXh0Tm9kZS5nZXRSYW5nZUxldHRlclNwYWNpbmcoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5saW5lSGVpZ2h0IDogdGV4dE5vZGUuZ2V0UmFuZ2VMaW5lSGVpZ2h0KGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IGZpbGxzID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmZpbGxzIDogdGV4dE5vZGUuZ2V0UmFuZ2VGaWxscyhpbmRleCwgaW5kZXggKyAxKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaWxsU3R5bGVJZCxcbiAgICAgICAgdGV4dFN0eWxlSWQsXG4gICAgICAgIGZvbnRTaXplLFxuICAgICAgICBmb250RmFtaWx5OiBmb250TmFtZS5mYW1pbHksXG4gICAgICAgIGZvbnRXZWlnaHQ6IEZPTlRfV0VJR0hUU1tmb250TmFtZS5zdHlsZV0gfHwgZm9udE5hbWUuc3R5bGUsXG4gICAgICAgIHRleHREZWNvcmF0aW9uLFxuICAgICAgICBsZXR0ZXJTcGFjaW5nOiBsZXR0ZXJTcGFjaW5nLnZhbHVlLFxuICAgICAgICBsZXR0ZXJTcGFjaW5nVW5pdDogbGV0dGVyU3BhY2luZy51bml0LFxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0LnZhbHVlLFxuICAgICAgICBsaW5lSGVpZ2h0VW5pdDogbGluZUhlaWdodC51bml0LFxuICAgICAgICBmaWxscyxcbiAgICAgICAgdGV4dEFsaWduSG9yaXpvbnRhbDogdGV4dE5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCxcbiAgICAgICAgdGV4dEFsaWduVmVydGljYWw6IHRleHROb2RlLnRleHRBbGlnblZlcnRpY2FsLFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGdldFRleHROb2RlU3R5bGUgPSB0ZXh0Tm9kZSA9PiB7XG4gICAgaWYgKGhhc1N5bWJvbFByb3BlcnRpZXModGV4dE5vZGUpKSB7XG4gICAgICAgIGNvbnN0IHRleHRUYWJsZSA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFRleHRTdHlsZTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHRleHROb2RlLmNoYXJhY3RlcnMsIChjaGFyYWN0ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dFN0eWxlID0gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgdGV4dFRhYmxlLnB1c2goT2JqZWN0LmFzc2lnbih7IHRleHQ6IGNoYXJhY3RlciB9LCBjdXJyZW50VGV4dFN0eWxlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0ZXN0VGV4dFN0eWxlID0gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dFRhYmxlTGVuZ3RoID0gdGV4dFRhYmxlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRXF1YWxQcm9wZXJ0aWVzKGN1cnJlbnRUZXh0U3R5bGUsIGxhc3Rlc3RUZXh0U3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRUYWJsZVt0ZXh0VGFibGVMZW5ndGggLSAxXS50ZXh0ICs9IGNoYXJhY3RlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRUYWJsZS5wdXNoKE9iamVjdC5hc3NpZ24oeyB0ZXh0OiBjaGFyYWN0ZXIgfSwgbGFzdGVzdFRleHRTdHlsZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dFN0eWxlID0gbGFzdGVzdFRleHRTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0ZXh0VGFibGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgZ2V0VGV4dE5vZGVTdHlsZSB9IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgeyBnZXRGaWxsU3R5bGUsIGdldFRleHRTdHlsZSwgZ2V0RWZmZWN0U3R5bGUsIGdldEdyaWRTdHlsZSB9IGZyb20gJy4vc3R5bGUnO1xuY29uc3Qgbm9kZVR5cGVNYXBzID0ge1xuICAgIFBPTFlHT046ICdSRUdVTEFSX1BPTFlHT04nLFxuICAgIFBBR0U6ICdDQU5WQVMnXG59O1xuY29uc3QgZ2V0U3R5bGVzID0gbm9kZSA9PiB7XG4gICAgaWYgKCFub2RlLmZpbGxTdHlsZUlkICYmICFub2RlLnRleHRTdHlsZUlkICYmICFub2RlLnN0cm9rZVN0eWxlSWQgJiYgIW5vZGUuZWZmZWN0U3R5bGVJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgIG5vZGUuZmlsbFN0eWxlSWQgJiYgdHlwZW9mIG5vZGUuZmlsbFN0eWxlSWQgIT09ICdzeW1ib2wnICYmIChzdHlsZXMuZmlsbCA9IG5vZGUuZmlsbFN0eWxlSWQpO1xuICAgIG5vZGUudGV4dFN0eWxlSWQgJiYgdHlwZW9mIG5vZGUudGV4dFN0eWxlSWQgIT09ICdzeW1ib2wnICYmIChzdHlsZXMudGV4dCA9IG5vZGUudGV4dFN0eWxlSWQpO1xuICAgIG5vZGUuc3Ryb2tlU3R5bGVJZCAmJiAoc3R5bGVzLnN0cm9rZSA9IG5vZGUuc3Ryb2tlU3R5bGVJZCk7XG4gICAgbm9kZS5lZmZlY3RTdHlsZUlkICYmIChzdHlsZXMuZWZmZWN0ID0gbm9kZS5lZmZlY3RTdHlsZUlkKTtcbiAgICByZXR1cm4gc3R5bGVzO1xufTtcbmNvbnN0IGFzc2lnblByb3BlcnRpZXMgPSAodHJlZU5vZGUsIG5vZGUpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IFtcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnbG9ja2VkJyxcbiAgICAgICAgJ2JsZW5kTW9kZScsXG4gICAgICAgICdzaXplJyxcbiAgICAgICAgJ2NsaXBzQ29udGVudCcsXG4gICAgICAgICdyZWxhdGl2ZVRyYW5zZm9ybScsXG4gICAgICAgICdlZmZlY3RzJyxcbiAgICAgICAgJ2lzTWFzaycsXG4gICAgICAgICdpc01hc2tPdXRsaW5lJyxcbiAgICAgICAgJ2Jvb2xlYW5PcGVyYXRpb24nXG4gICAgXTtcbiAgICBpZiAobm9kZS5vcGFjaXR5ICE9PSAxICYmIG5vZGUub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyZWVOb2RlLm9wYWNpdHkgPSBub2RlLm9wYWNpdHk7XG4gICAgfVxuICAgIGFsbG93ZWRQcm9wZXJ0aWVzLm1hcChwcm9wZXJ0eSA9PiB7XG4gICAgICAgIGlmIChub2RlW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0cmVlTm9kZVtwcm9wZXJ0eV0gPSBub2RlW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmNvbnN0IGhhbmRsZUV4cG9ydFNldHRpbmdzID0gKHRyZWVOb2RlLCBub2RlLCBjYWxsYmFjaykgPT4ge1xuICAgIGlmIChub2RlLmV4cG9ydFNldHRpbmdzKSB7XG4gICAgICAgIHRyZWVOb2RlLmV4cG9ydFNldHRpbmdzID0gbm9kZS5leHBvcnRTZXR0aW5ncztcbiAgICAgICAgaWYgKG5vZGUuZXhwb3J0U2V0dGluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhub2RlLmV4cG9ydFNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBoYW5kbGVCb3VuZGluZ0JveCA9ICh0cmVlTm9kZSwgbm9kZSwgdHlwZSkgPT4ge1xuICAgIGlmICh0eXBlICE9PSAnQ0FOVkFTJyAmJiB0eXBlICE9PSAnRE9DVU1FTlQnKSB7XG4gICAgICAgIHRyZWVOb2RlLmFic29sdXRlQm91bmRpbmdCb3ggPSB7XG4gICAgICAgICAgICB4OiBub2RlLmFic29sdXRlVHJhbnNmb3JtWzBdWzJdLFxuICAgICAgICAgICAgeTogbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybVsxXVsyXSxcbiAgICAgICAgICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmhlaWdodFxuICAgICAgICB9O1xuICAgIH1cbn07XG5jb25zdCBoYW5kbGVDb3JuZXJSYWRpdXMgPSAodHJlZU5vZGUsIG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS5jb3JuZXJSYWRpdXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmNvcm5lclJhZGl1cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRyZWVOb2RlLmNvcm5lclJhZGl1cyA9IG5vZGUuY29ybmVyUmFkaXVzO1xuICAgICAgICAgICAgdHJlZU5vZGUucmVjdGFuZ2xlQ29ybmVyUmFkaWkgPSBBcnJheS5mcm9tKEFycmF5KDQpLCAoKSA9PiBub2RlLmNvcm5lclJhZGl1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmVlTm9kZS5yZWN0YW5nbGVDb3JuZXJSYWRpaSA9IFtcbiAgICAgICAgICAgICAgICBub2RlLnRvcExlZnRSYWRpdXMsXG4gICAgICAgICAgICAgICAgbm9kZS50b3BSaWdodFJhZGl1cyxcbiAgICAgICAgICAgICAgICBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLFxuICAgICAgICAgICAgICAgIG5vZGUuYm90dG9tTGVmdFJhZGl1c1xuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBoYW5kbGVTdHlsZSA9ICh0cmVlTm9kZSwgbm9kZSkgPT4ge1xuICAgIGlmIChub2RlLmZpbGxzICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG5vZGUuZmlsbHMgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHRyZWVOb2RlLmZpbGxzID0gbm9kZS5maWxscztcbiAgICB9XG4gICAgaWYgKG5vZGUuc3Ryb2tlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyZWVOb2RlLnN0cm9rZXMgPSBub2RlLnN0cm9rZXM7XG4gICAgICAgIHRyZWVOb2RlLnN0cm9rZVdlaWdodCA9IHRyZWVOb2RlLnN0cm9rZVdlaWdodCAhPT0gdW5kZWZpbmVkID8gdHJlZU5vZGUuc3Ryb2tlV2VpZ2h0IDogMTtcbiAgICAgICAgdHJlZU5vZGUuc3Ryb2tlQWxpZ24gPSB0cmVlTm9kZS5zdHJva2VBbGlnbiB8fCAnSU5TSURFJztcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKG5vZGUpO1xuICAgIGlmIChzdHlsZXMpIHtcbiAgICAgICAgdHJlZU5vZGUuc3R5bGVzID0gc3R5bGVzO1xuICAgIH1cbn07XG5jb25zdCBoYW5kbGVTcGVjaWFsTm9kZSA9ICh0cmVlTm9kZSwgbm9kZSwgdHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdDQU5WQVMnOlxuICAgICAgICAgICAgdHJlZU5vZGUuYmFja2dyb3VuZENvbG9yID0gbm9kZS5iYWNrZ3JvdW5kc1swXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdURVhUJzpcbiAgICAgICAgICAgIHRyZWVOb2RlLmNoYXJhY3RlcnMgPSBub2RlLmNoYXJhY3RlcnM7XG4gICAgICAgICAgICBjb25zdCB0ZXh0U3R5bGUgPSBnZXRUZXh0Tm9kZVN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgY29uc3QgaXNNaXhlZFRleHQgPSBBcnJheS5pc0FycmF5KHRleHRTdHlsZSk7XG4gICAgICAgICAgICB0cmVlTm9kZS5pc01peGVkVGV4dCA9IGlzTWl4ZWRUZXh0O1xuICAgICAgICAgICAgaWYgKGlzTWl4ZWRUZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRleHRTdHlsZVswXSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZpcnN0U3R5bGUudGV4dDtcbiAgICAgICAgICAgICAgICB0cmVlTm9kZS5zdHlsZSA9IGZpcnN0U3R5bGU7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUudGV4dFRhYmxlID0gdGV4dFN0eWxlO1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLmZpbGxzID0gdGV4dFN0eWxlWzBdLmZpbGxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUudGV4dFRhYmxlID0gW107XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuc3R5bGUgPSB0ZXh0U3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSU5TVEFOQ0UnOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0cmVlTm9kZS5jb21wb25lbnRJZCA9IG5vZGUubWFzdGVyQ29tcG9uZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHdhbGtEb2N1bWVudCA9IChkb2N1bWVudCwgc2VsZWN0ZWRGcmFtZUtleXMsIGluY2x1ZGVDb21wb25lbnRzKSA9PiB7XG4gICAgY29uc3QgZmlsZURhdGEgPSB7XG4gICAgICAgIGlzRnJvbVBsdWdpbjogdHJ1ZSxcbiAgICAgICAgbmFtZTogZG9jdW1lbnQubmFtZSxcbiAgICAgICAgZG9jdW1lbnQ6IHt9XG4gICAgfTtcbiAgICBsZXQgY29tcG9uZW50Tm9kZXMgPSBbXTtcbiAgICBjb25zdCBmcmFtZU5vZGVzID0gW107XG4gICAgY29uc3QgZXhwb3J0U2V0dGluZ05vZGVzID0gW107XG4gICAgY29uc3QgZXhwb3J0U2V0dGluZ3MgPSBbXTtcbiAgICBjb25zdCBzdGVwID0gKG5vZGUsIGlzU3RlcHBpbmdDb21wb25lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IG5vZGVUeXBlTWFwc1tub2RlLnR5cGVdIHx8IG5vZGUudHlwZTtcbiAgICAgICAgY29uc3QgdHJlZU5vZGUgPSB7XG4gICAgICAgICAgICBpZDogbm9kZS5pZCxcbiAgICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgICAgIHR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgYXNzaWduUHJvcGVydGllcyh0cmVlTm9kZSwgbm9kZSk7XG4gICAgICAgIGhhbmRsZVNwZWNpYWxOb2RlKHRyZWVOb2RlLCBub2RlLCB0eXBlKTtcbiAgICAgICAgaGFuZGxlU3R5bGUodHJlZU5vZGUsIG5vZGUpO1xuICAgICAgICBoYW5kbGVDb3JuZXJSYWRpdXModHJlZU5vZGUsIG5vZGUpO1xuICAgICAgICBoYW5kbGVCb3VuZGluZ0JveCh0cmVlTm9kZSwgbm9kZSwgdHlwZSk7XG4gICAgICAgIGhhbmRsZUV4cG9ydFNldHRpbmdzKHRyZWVOb2RlLCBub2RlLCBpbWFnZUV4cG9ydFNldHRpbmdzID0+IHtcbiAgICAgICAgICAgIGlmICghaXNTdGVwcGluZ0NvbXBvbmVudCAmJiBub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpbWFnZUV4cG9ydFNldHRpbmdzLm1hcChpbWFnZUV4cG9ydFNldHRpbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBvcnRTZXR0aW5nTm9kZXMucHVzaCh7IGV4cG9ydFR5cGU6ICdleHBvcnRTZXR0aW5nJywgbm9kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0U2V0dGluZ3MucHVzaChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGltYWdlRXhwb3J0U2V0dGluZyksIHsgaWQ6IG5vZGUuaWQsIG5hbWU6IG5vZGUubmFtZSB9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgdHJlZU5vZGUuY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgLmZpbHRlcihub2RlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FydGJvYXJkID0gbm9kZS5wYXJlbnQudHlwZSA9PT0gJ1BBR0UnICYmIG5vZGUudHlwZSA9PT0gJ0ZSQU1FJztcbiAgICAgICAgICAgICAgICBpc0FydGJvYXJkICYmIHNlbGVjdGVkRnJhbWVLZXlzLmluZGV4T2Yobm9kZS5pZCkgPiAtMSAmJiBmcmFtZU5vZGVzLnB1c2goeyBleHBvcnRUeXBlOiAnZnJhbWUnLCBub2RlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0FydGJvYXJkID8gc2VsZWN0ZWRGcmFtZUtleXMuaW5kZXhPZihub2RlLmlkKSA+IC0xIDogbm9kZS5wYXJlbnQudHlwZSAhPT0gJ1BBR0UnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAubWFwKG5vZGUgPT4gc3RlcChub2RlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyZWVOb2RlO1xuICAgIH07XG4gICAgZmlsZURhdGEuc3R5bGVzID0ge1xuICAgICAgICBGSUxMOiBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkubWFwKHN0eWxlID0+IGdldEZpbGxTdHlsZShzdHlsZSkpLFxuICAgICAgICBURVhUOiBmaWdtYS5nZXRMb2NhbFRleHRTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0VGV4dFN0eWxlKHN0eWxlKSksXG4gICAgICAgIEVGRkVDVDogZmlnbWEuZ2V0TG9jYWxFZmZlY3RTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0RWZmZWN0U3R5bGUoc3R5bGUpKSxcbiAgICAgICAgR1JJRDogZmlnbWEuZ2V0TG9jYWxHcmlkU3R5bGVzKCkubWFwKHN0eWxlID0+IGdldEdyaWRTdHlsZShzdHlsZSkpXG4gICAgfTtcbiAgICBjb21wb25lbnROb2RlcyA9IGRvY3VtZW50XG4gICAgICAgIC5maW5kQWxsKGMgPT4gYy50eXBlID09PSAnQ09NUE9ORU5UJyAmJiBjLnZpc2libGUpXG4gICAgICAgIC5tYXAobm9kZSA9PiAoeyBleHBvcnRUeXBlOiAnY29tcG9uZW50Jywgbm9kZSB9KSk7XG4gICAgZmlsZURhdGEuY29tcG9uZW50cyA9IGNvbXBvbmVudE5vZGVzLm1hcCgoeyBub2RlIH0pID0+IGluY2x1ZGVDb21wb25lbnRzID8gc3RlcChub2RlLCB0cnVlKSA6IHsgaWQ6IG5vZGUuaWQsIG5hbWU6IG5vZGUubmFtZSwgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfSk7XG4gICAgZmlsZURhdGEuZG9jdW1lbnQgPSBzdGVwKGRvY3VtZW50KTtcbiAgICBmaWxlRGF0YS5leHBvcnRTZXR0aW5ncyA9IGV4cG9ydFNldHRpbmdzO1xuICAgIHJldHVybiB7IGZpbGVEYXRhLCBmcmFtZU5vZGVzLCBleHBvcnRTZXR0aW5nTm9kZXMsIGNvbXBvbmVudE5vZGVzIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==