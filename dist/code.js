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
                value: useHDImages ? 2 : 1,
            },
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${frameNode.id}.png`);
        const fileActualName = `${frameNode.name}.png`;
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
                fileActualName,
                fileName,
                type: 'frame',
            },
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
                type: 'exportSetting',
            },
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
                value: useHDImages ? 2 : 1,
            },
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${componentNode.id}.png`);
        const fileActualName = `${componentNode.name}.png`;
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
                fileActualName,
                fileName,
                type: 'component',
            },
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
    PAGE: 'CANVAS',
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
        'booleanOperation',
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
            height: node.height,
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
                node.bottomLeftRadius,
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
        document: {},
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
            type,
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
                isArtboard &&
                    selectedFrameKeys.indexOf(node.id) > -1 &&
                    frameNodes.push({ exportType: 'frame', node });
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
        GRID: figma.getLocalGridStyles().map(style => Object(_style__WEBPACK_IMPORTED_MODULE_1__["getGridStyle"])(style)),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9leHBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2ZyYW1lcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvd2Fsay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxF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LGdDQUFnQztBQUN2RCwrQ0FBK0MsT0FBTyw2Q0FBNkMsOERBQThEO0FBQ2pLO0FBQ0E7QUFDQSxZQUFZO0FBQ1oiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBnZXRBbGxQYWdlZEZyYW1lcywgZ2V0Q3VycmVudFBhZ2VGcmFtZUtleXMgfSBmcm9tICcuLi91dGlscy9mcmFtZXMnO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuLi91dGlscy9oZWxwZXInO1xuaW1wb3J0IHsgZXhwb3J0RnJhbWUsIGV4cG9ydENvbXBvbmVudCwgZXhwb3J0RXhwb3J0U2V0dGluZyB9IGZyb20gJy4uL3V0aWxzL2V4cG9ydCc7XG5pbXBvcnQgeyB3YWxrRG9jdW1lbnQgfSBmcm9tICcuLi91dGlscy93YWxrJztcbmxldCBmaWxlRGF0YSwgdXNlSERJbWFnZXMsIGluY2x1ZGVDb21wb25lbnRzO1xubGV0IGZyYW1lTm9kZXMgPSBbXSwgZXhwb3J0U2V0dGluZ05vZGVzID0gW10sIGNvbXBvbmVudE5vZGVzID0gW10sIGV4cG9ydE5vZGVzID0gW107XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiA0ODAgfSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAobXNnLnR5cGUgPT09ICd1aTpzZXQtd2VsY29tZWQnKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ3dlbGNvbWVkJywgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAndWk6Z2V0LXdlbGNvbWVkJykge1xuICAgICAgICBjb25zdCB3ZWxjb21lZCA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ3dlbGNvbWVkJyk7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzp3ZWxjb21lZC1nb3QnLFxuICAgICAgICAgICAgbWVzc2FnZTogeyB3ZWxjb21lZCB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1aTpnZXQtZnJhbWVzJykge1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6ZnJhbWVzLWdvdCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgYWxsRnJhbWVzOiBnZXRBbGxQYWdlZEZyYW1lcyhmaWdtYS5yb290KSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RnJhbWVzOiBnZXRDdXJyZW50UGFnZUZyYW1lS2V5cyhmaWdtYS5jdXJyZW50UGFnZSksXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2VLZXk6IGZpZ21hLmN1cnJlbnRQYWdlLmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAndWk6Z2V0LWRvY3VtZW50Jykge1xuICAgICAgICBjb25zdCB7IHBhZ2VkRnJhbWVzLCBzZWxlY3RlZEZyYW1lS2V5cywgaW5jbHVkZUNvbXBvbmVudHM6IHdpdGhDb21wb25lbnRzLCB1c2VIREltYWdlczogdXNlSEQgfSA9IG1zZztcbiAgICAgICAgY29uc3QgZGF0YSA9IHdhbGtEb2N1bWVudChmaWdtYS5yb290LCBzZWxlY3RlZEZyYW1lS2V5cywgd2l0aENvbXBvbmVudHMpO1xuICAgICAgICBmaWxlRGF0YSA9IGRhdGEuZmlsZURhdGE7XG4gICAgICAgIGluY2x1ZGVDb21wb25lbnRzID0gd2l0aENvbXBvbmVudHM7XG4gICAgICAgIHVzZUhESW1hZ2VzID0gdXNlSEQ7XG4gICAgICAgIGZyYW1lTm9kZXMgPSBkYXRhLmZyYW1lTm9kZXM7XG4gICAgICAgIGV4cG9ydFNldHRpbmdOb2RlcyA9IGRhdGEuZXhwb3J0U2V0dGluZ05vZGVzO1xuICAgICAgICBjb21wb25lbnROb2RlcyA9IGRhdGEuY29tcG9uZW50Tm9kZXM7XG4gICAgICAgIGV4cG9ydE5vZGVzID0gZnJhbWVOb2Rlcy5jb25jYXQoZXhwb3J0U2V0dGluZ05vZGVzLCBpbmNsdWRlQ29tcG9uZW50cyA/IGNvbXBvbmVudE5vZGVzIDogW10pO1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6ZG9jdW1lbnQtZ290JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgZmlsZURhdGEsIHBhZ2VkRnJhbWVzLCBzZWxlY3RlZEZyYW1lS2V5cywgaW5jbHVkZUNvbXBvbmVudHMsIHVzZUhESW1hZ2VzIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3VpOmV4cG9ydC1pbWFnZScpIHtcbiAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gbXNnO1xuICAgICAgICBjb25zdCB7IGV4cG9ydFR5cGUsIG5vZGUgfSA9IGV4cG9ydE5vZGVzW2luZGV4XTtcbiAgICAgICAgc3dpdGNoIChleHBvcnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdmcmFtZSc6XG4gICAgICAgICAgICAgICAgeWllbGQgZXhwb3J0RnJhbWUobm9kZSwgdXNlSERJbWFnZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXhwb3J0U2V0dGluZyc6XG4gICAgICAgICAgICAgICAgeWllbGQgZXhwb3J0RXhwb3J0U2V0dGluZyhub2RlLCBmaWxlRGF0YS5leHBvcnRTZXR0aW5ncywgaW5kZXggLSBmcmFtZU5vZGVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb21wb25lbnQnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGV4cG9ydENvbXBvbmVudChub2RlLCB1c2VIREltYWdlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UsIHRyaW1GaWxlUGF0aCwgZ2V0RmlsZU5hbWUgfSBmcm9tICcuLi91dGlscy9oZWxwZXInO1xuZXhwb3J0IGNvbnN0IGV4cG9ydEZyYW1lID0gKGZyYW1lTm9kZSwgdXNlSERJbWFnZXMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGltZ0RhdGEgPSB5aWVsZCBmcmFtZU5vZGUuZXhwb3J0QXN5bmMoe1xuICAgICAgICAgICAgZm9ybWF0OiAnUE5HJyxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnU0NBTEUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1c2VIREltYWdlcyA/IDIgOiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdHJpbUZpbGVQYXRoKGAke2ZyYW1lTm9kZS5pZH0ucG5nYCk7XG4gICAgICAgIGNvbnN0IGZpbGVBY3R1YWxOYW1lID0gYCR7ZnJhbWVOb2RlLm5hbWV9LnBuZ2A7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzppbWFnZS1leHBvcnRlZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlQWN0dWFsTmFtZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZnJhbWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBleHBvcnRFeHBvcnRTZXR0aW5nID0gKGV4cG9ydE5vZGUsIGV4cG9ydFNldHRpbmdzLCBpbmRleCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXhwb3J0U2V0dGluZyA9IE9iamVjdC5hc3NpZ24oe30sIGV4cG9ydFNldHRpbmdzW2luZGV4XSk7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gZ2V0RmlsZU5hbWUoZXhwb3J0U2V0dGluZywgaW5kZXgpO1xuICAgICAgICBkZWxldGUgZXhwb3J0U2V0dGluZy5pZDtcbiAgICAgICAgZGVsZXRlIGV4cG9ydFNldHRpbmcubmFtZTtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IHlpZWxkIGV4cG9ydE5vZGUuZXhwb3J0QXN5bmMoZXhwb3J0U2V0dGluZyk7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzppbWFnZS1leHBvcnRlZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlQWN0dWFsTmFtZTogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2V4cG9ydFNldHRpbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBleHBvcnRDb21wb25lbnQgPSAoY29tcG9uZW50Tm9kZSwgdXNlSERJbWFnZXMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGltZ0RhdGEgPSB5aWVsZCBjb21wb25lbnROb2RlLmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1NDQUxFJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdXNlSERJbWFnZXMgPyAyIDogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRyaW1GaWxlUGF0aChgJHtjb21wb25lbnROb2RlLmlkfS5wbmdgKTtcbiAgICAgICAgY29uc3QgZmlsZUFjdHVhbE5hbWUgPSBgJHtjb21wb25lbnROb2RlLm5hbWV9LnBuZ2A7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzppbWFnZS1leHBvcnRlZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgaW1nRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlQWN0dWFsTmFtZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSk7XG4iLCJleHBvcnQgY29uc3QgZ2V0RmxhdHRlbmVkRnJhbWVLZXlzID0gKHBhZ2VkRnJhbWVzLCBjaGVja2VkS2V5cykgPT4ge1xuICAgIGNvbnN0IGZyYW1lS2V5cyA9IFtdO1xuICAgIHBhZ2VkRnJhbWVzLm1hcCgoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICAuZmlsdGVyKCh7IGtleSB9KSA9PiAoY2hlY2tlZEtleXMgPyBjaGVja2VkS2V5cy5pbmRleE9mKGtleSkgPiAtMSA6IHRydWUpKVxuICAgICAgICAgICAgLm1hcCgoeyBrZXkgfSkgPT4ge1xuICAgICAgICAgICAgZnJhbWVLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZyYW1lS2V5cztcbn07XG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRQYWdlZEZyYW1lcyA9IChmcmFtZXMsIGNoZWNrZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgcGFnZWRGcmFtZXMgPSB7fTtcbiAgICBmcmFtZXMubWFwKCh7IGtleSwgdGl0bGUsIGNoaWxkcmVuIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRGcmFtZXMgPSBjaGlsZHJlbi5maWx0ZXIoKHsga2V5IH0pID0+IGNoZWNrZWRLZXlzLmluZGV4T2Yoa2V5KSA+IC0xKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkRnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcGFnZWRGcmFtZXNba2V5XSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBmcmFtZXM6IHNlbGVjdGVkRnJhbWVzLm1hcCgoeyBrZXksIHRpdGxlIH0pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZWRGcmFtZXM7XG59O1xuZXhwb3J0IGNvbnN0IGdldFBhZ2VLZXlzID0gZnJhbWVzID0+IHtcbiAgICBjb25zdCBwYWdlS2V5cyA9IGZyYW1lcy5tYXAoKHsga2V5IH0pID0+IGtleSk7XG4gICAgcmV0dXJuIHBhZ2VLZXlzO1xufTtcbmV4cG9ydCBjb25zdCBnZXRBbGxQYWdlZEZyYW1lcyA9IGRvY3VtZW50ID0+IGRvY3VtZW50LmNoaWxkcmVuXG4gICAgLm1hcChwYWdlID0+ICh7XG4gICAga2V5OiBwYWdlLmlkLFxuICAgIHRpdGxlOiBwYWdlLm5hbWUsXG4gICAgY2hpbGRyZW46IHBhZ2UuY2hpbGRyZW5cbiAgICAgICAgLmZpbHRlcigoeyB0eXBlLCB2aXNpYmxlIH0pID0+IHR5cGUgPT09ICdGUkFNRScgJiYgdmlzaWJsZSlcbiAgICAgICAgLm1hcChmcmFtZSA9PiAoe1xuICAgICAgICBrZXk6IGZyYW1lLmlkLFxuICAgICAgICB0aXRsZTogZnJhbWUubmFtZSxcbiAgICB9KSlcbiAgICAgICAgLnJldmVyc2UoKSxcbn0pKVxuICAgIC5maWx0ZXIocGFnZSA9PiAhIXBhZ2UuY2hpbGRyZW4ubGVuZ3RoKTtcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50UGFnZUZyYW1lS2V5cyA9IGN1cnJlbnRQYWdlID0+IGN1cnJlbnRQYWdlLmNoaWxkcmVuLmZpbHRlcigoeyB0eXBlLCB2aXNpYmxlIH0pID0+IHR5cGUgPT09ICdGUkFNRScgJiYgdmlzaWJsZSkubWFwKGZyYW1lID0+IGZyYW1lLmlkKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlID0gbWVzc2FnZSA9PiB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG59O1xuZXhwb3J0IGNvbnN0IGFzeW5jRm9yRWFjaCA9IChhcnJheSwgY2FsbGJhY2spID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgeWllbGQgY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IHRyaW1GaWxlUGF0aCA9IGZpbGVQYXRoID0+IGZpbGVQYXRoLnJlcGxhY2UoL1xcLy9nLCAnLScpLnJlcGxhY2UoLzovZywgJy0nKTtcbmV4cG9ydCBjb25zdCBnZXRGaWxlTmFtZSA9IChleHBvcnRTZXR0aW5nLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHsgbmFtZSwgc3VmZml4LCBmb3JtYXQsIGNvbnN0cmFpbnQgfSA9IGV4cG9ydFNldHRpbmc7XG4gICAgbGV0IGZpbGVOYW1lID0gc3VmZml4ID8gYCR7bmFtZX0tJHtzdWZmaXh9YCA6IG5hbWU7XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmlsZU5hbWUgKz0gYC0ke2luZGV4fWA7XG4gICAgfVxuICAgIGNvbnN0IHNjYWxlID0gZm9ybWF0ID09PSAnU1ZHJyA/ICcnIDogYEAke2NvbnN0cmFpbnQudmFsdWV9eGA7XG4gICAgY29uc3QgZmlsZUZvcm1hdCA9IGZvcm1hdC50b0xvd2VyQ2FzZSgpO1xuICAgIGZpbGVOYW1lID0gZmlsZU5hbWUucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIHJldHVybiBgJHt0cmltRmlsZVBhdGgoZmlsZU5hbWUpfSR7c2NhbGV9LiR7ZmlsZUZvcm1hdH1gO1xufTtcbmV4cG9ydCBjb25zdCBnZXRTb3VyY2VDb2RlID0gdXJsID0+IGZldGNoKHVybClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgcmV0dXJuIHsgZXJyOiBlcnJvciB9O1xufSk7XG5leHBvcnQgY29uc3QgZ2V0QnVmZmVyRGF0YSA9IHVybCA9PiB7XG4gICAgcmV0dXJuIGZldGNoKHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBlcnI6IGVycm9yIH07XG4gICAgfSk7XG59O1xuIiwiaW1wb3J0IHsgRk9OVF9XRUlHSFRTIH0gZnJvbSAnLi90ZXh0JztcbmV4cG9ydCBjb25zdCBnZXRGaWxsU3R5bGUgPSBzdHlsZSA9PiAoe1xuICAgIGlkOiBzdHlsZS5pZCxcbiAgICBrZXk6IHN0eWxlLmtleSxcbiAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICBzdHlsZVR5cGU6ICdGSUxMJyxcbiAgICBpdGVtczogc3R5bGUucGFpbnRzLFxufSk7XG5leHBvcnQgY29uc3QgZ2V0VGV4dFN0eWxlID0gc3R5bGUgPT4gKHtcbiAgICBpZDogc3R5bGUuaWQsXG4gICAga2V5OiBzdHlsZS5rZXksXG4gICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgc3R5bGVUeXBlOiAnVEVYVCcsXG4gICAgaXRlbXM6IHtcbiAgICAgICAgZm9udFNpemU6IHN0eWxlLmZvbnRTaXplLFxuICAgICAgICBmb250RmFtaWx5OiBzdHlsZS5mb250TmFtZS5mYW1pbHksXG4gICAgICAgIGZvbnRXZWlnaHQ6IEZPTlRfV0VJR0hUU1tzdHlsZS5mb250TmFtZS5zdHlsZV0gfHwgc3R5bGUuZm9udE5hbWUuc3R5bGUsXG4gICAgICAgIHRleHREZWNvcmF0aW9uOiBzdHlsZS50ZXh0RGVjb3JhdGlvbixcbiAgICAgICAgbGV0dGVyU3BhY2luZzogc3R5bGUubGV0dGVyU3BhY2luZy52YWx1ZSxcbiAgICAgICAgbGV0dGVyU3BhY2luZ1VuaXQ6IHN0eWxlLmxldHRlclNwYWNpbmcudW5pdCxcbiAgICAgICAgbGluZUhlaWdodDogc3R5bGUubGluZUhlaWdodC52YWx1ZSxcbiAgICAgICAgbGluZUhlaWdodFVuaXQ6IHN0eWxlLmxpbmVIZWlnaHQudW5pdCxcbiAgICB9LFxufSk7XG5leHBvcnQgY29uc3QgZ2V0RWZmZWN0U3R5bGUgPSBzdHlsZSA9PiAoe1xuICAgIGlkOiBzdHlsZS5pZCxcbiAgICBrZXk6IHN0eWxlLmtleSxcbiAgICBuYW1lOiBzdHlsZS5uYW1lLFxuICAgIGRlc2NyaXB0aW9uOiBzdHlsZS5kZXNjcmlwdGlvbixcbiAgICBzdHlsZVR5cGU6ICdFRkZFQ1QnLFxuICAgIGl0ZW1zOiBzdHlsZS5lZmZlY3RzLFxufSk7XG5leHBvcnQgY29uc3QgZ2V0R3JpZFN0eWxlID0gc3R5bGUgPT4gKHtcbiAgICBpZDogc3R5bGUuaWQsXG4gICAga2V5OiBzdHlsZS5rZXksXG4gICAgbmFtZTogc3R5bGUubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogc3R5bGUuZGVzY3JpcHRpb24sXG4gICAgc3R5bGVUeXBlOiAnR1JJRCcsXG4gICAgaXRlbXM6IHN0eWxlLmxheW91dEdyaWRzLFxufSk7XG4iLCJleHBvcnQgY29uc3QgRk9OVF9XRUlHSFRTID0ge1xuICAgIFVsdHJhbGlnaHQ6ICd1bHRyYWxpZ2h0JyxcbiAgICAnMTAwJzogJ3VsdHJhbGlnaHQnLFxuICAgIFRoaW46ICd0aGluJyxcbiAgICAnMjAwJzogJ3RoaW4nLFxuICAgIExpZ2h0OiAnbGlnaHQnLFxuICAgICczMDAnOiAnbGlnaHQnLFxuICAgIE5vcm1hbDogJ3JlZ3VsYXInLFxuICAgIFJlZ3VsYXI6ICdyZWd1bGFyJyxcbiAgICAnNDAwJzogJ3JlZ3VsYXInLFxuICAgIE1lZGl1bTogJ21lZGl1bScsXG4gICAgU2VtaWJvbGQ6ICdzZW1pYm9sZCcsXG4gICAgRGVtaWJvbGQ6ICdzZW1pYm9sZCcsXG4gICAgJzUwMCc6ICdzZW1pYm9sZCcsXG4gICAgJzYwMCc6ICdzZW1pYm9sZCcsXG4gICAgQm9sZDogJ2JvbGQnLFxuICAgICc3MDAnOiAnYm9sZCcsXG4gICAgRXh0cmFib2xkOiAnaGVhdnknLFxuICAgIFVsdHJhYm9sZDogJ2hlYXZ5JyxcbiAgICBIZWF2eTogJ2hlYXZ5JyxcbiAgICAnODAwJzogJ2hlYXZ5JyxcbiAgICBCbGFjazogJ2JsYWNrJyxcbiAgICAnOTAwJzogJ2JhY2wnLFxufTtcbmV4cG9ydCBjb25zdCBjb21wYXJlU3R5bGVzID0gKHN0eWxlMSwgc3R5bGUyKSA9PiB7XG4gICAgY29uc3QgcHJvcHMxID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3R5bGUxKTtcbiAgICBjb25zdCBwcm9wczIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdHlsZTIpO1xuICAgIGlmIChwcm9wczEubGVuZ3RoICE9PSBwcm9wczIubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwIGluIHN0eWxlMSkge1xuICAgICAgICBpZiAoc3R5bGUxLmhhc093blByb3BlcnR5KHApICE9PSBzdHlsZTIuaGFzT3duUHJvcGVydHkocCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHN0eWxlMVtwXSkge1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVTdHlsZXMoc3R5bGUxW3BdLCBzdHlsZTJbcF0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChzdHlsZTFbcF0gIT09IHN0eWxlMltwXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbmV4cG9ydCBjb25zdCBoYXNTeW1ib2xQcm9wZXJ0aWVzID0gdGV4dE5vZGUgPT4ge1xuICAgIGNvbnN0IHsgZm9udE5hbWUsIGZvbnRTaXplLCBsaW5lSGVpZ2h0LCB0ZXh0RGVjb3JhdGlvbiwgbGV0dGVyU3BhY2luZywgZmlsbHMgfSA9IHRleHROb2RlO1xuICAgIHJldHVybiAhIVtmb250TmFtZSwgZm9udFNpemUsIGxpbmVIZWlnaHQsIHRleHREZWNvcmF0aW9uLCBsZXR0ZXJTcGFjaW5nLCBmaWxsc10uZmlsdGVyKGFyZyA9PiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJykubGVuZ3RoO1xufTtcbmV4cG9ydCBjb25zdCBoYXNFcXVhbFByb3BlcnRpZXMgPSAoc3R5bGUsIGFub3RoZXJTdHlsZSkgPT4ge1xuICAgIGlmIChzdHlsZS5maWxsU3R5bGVJZCAmJlxuICAgICAgICBhbm90aGVyU3R5bGUuZmlsbFN0eWxlSWQgJiZcbiAgICAgICAgc3R5bGUudGV4dFN0eWxlSWQgJiZcbiAgICAgICAgYW5vdGhlclN0eWxlLnRleHRTdHlsZUlkICYmXG4gICAgICAgIHN0eWxlLmZpbGxTdHlsZUlkID09PSBhbm90aGVyU3R5bGUuZmlsbFN0eWxlSWQgJiZcbiAgICAgICAgc3R5bGUudGV4dFN0eWxlSWQgPT09IGFub3RoZXJTdHlsZS50ZXh0U3R5bGVJZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgICFhbm90aGVyU3R5bGUuZmlsbFN0eWxlSWQgJiZcbiAgICAgICAgIXN0eWxlLnRleHRTdHlsZUlkICYmXG4gICAgICAgICFhbm90aGVyU3R5bGUudGV4dFN0eWxlSWQpIHtcbiAgICAgICAgY29uc3QgaXNUaGVTYW1lID0gY29tcGFyZVN0eWxlcyhzdHlsZSwgYW5vdGhlclN0eWxlKTtcbiAgICAgICAgcmV0dXJuIGlzVGhlU2FtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGdldFNpbmdsZVRleHRTdHlsZSA9ICh0ZXh0Tm9kZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBmaWxsU3R5bGVJZCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5maWxsU3R5bGVJZCA6IHRleHROb2RlLmdldFJhbmdlRmlsbFN0eWxlSWQoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgdGV4dFN0eWxlSWQgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUudGV4dFN0eWxlSWQgOiB0ZXh0Tm9kZS5nZXRSYW5nZVRleHRTdHlsZUlkKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IGZvbnRTaXplID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmZvbnRTaXplIDogdGV4dE5vZGUuZ2V0UmFuZ2VGb250U2l6ZShpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBmb250TmFtZSA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5mb250TmFtZSA6IHRleHROb2RlLmdldFJhbmdlRm9udE5hbWUoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgdGV4dERlY29yYXRpb24gPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUudGV4dERlY29yYXRpb24gOiB0ZXh0Tm9kZS5nZXRSYW5nZVRleHREZWNvcmF0aW9uKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IGxldHRlclNwYWNpbmcgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUubGV0dGVyU3BhY2luZyA6IHRleHROb2RlLmdldFJhbmdlTGV0dGVyU3BhY2luZyhpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBsaW5lSGVpZ2h0ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmxpbmVIZWlnaHQgOiB0ZXh0Tm9kZS5nZXRSYW5nZUxpbmVIZWlnaHQoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgZmlsbHMgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUuZmlsbHMgOiB0ZXh0Tm9kZS5nZXRSYW5nZUZpbGxzKGluZGV4LCBpbmRleCArIDEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZpbGxTdHlsZUlkLFxuICAgICAgICB0ZXh0U3R5bGVJZCxcbiAgICAgICAgZm9udFNpemUsXG4gICAgICAgIGZvbnRGYW1pbHk6IGZvbnROYW1lLmZhbWlseSxcbiAgICAgICAgZm9udFdlaWdodDogRk9OVF9XRUlHSFRTW2ZvbnROYW1lLnN0eWxlXSB8fCBmb250TmFtZS5zdHlsZSxcbiAgICAgICAgdGV4dERlY29yYXRpb24sXG4gICAgICAgIGxldHRlclNwYWNpbmc6IGxldHRlclNwYWNpbmcudmFsdWUsXG4gICAgICAgIGxldHRlclNwYWNpbmdVbml0OiBsZXR0ZXJTcGFjaW5nLnVuaXQsXG4gICAgICAgIGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHQudmFsdWUsXG4gICAgICAgIGxpbmVIZWlnaHRVbml0OiBsaW5lSGVpZ2h0LnVuaXQsXG4gICAgICAgIGZpbGxzLFxuICAgICAgICB0ZXh0QWxpZ25Ib3Jpem9udGFsOiB0ZXh0Tm9kZS50ZXh0QWxpZ25Ib3Jpem9udGFsLFxuICAgICAgICB0ZXh0QWxpZ25WZXJ0aWNhbDogdGV4dE5vZGUudGV4dEFsaWduVmVydGljYWwsXG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgZ2V0VGV4dE5vZGVTdHlsZSA9IHRleHROb2RlID0+IHtcbiAgICBpZiAoaGFzU3ltYm9sUHJvcGVydGllcyh0ZXh0Tm9kZSkpIHtcbiAgICAgICAgY29uc3QgdGV4dFRhYmxlID0gW107XG4gICAgICAgIGxldCBjdXJyZW50VGV4dFN0eWxlO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodGV4dE5vZGUuY2hhcmFjdGVycywgKGNoYXJhY3RlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0U3R5bGUgPSBnZXRTaW5nbGVUZXh0U3R5bGUodGV4dE5vZGUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB0ZXh0VGFibGUucHVzaChPYmplY3QuYXNzaWduKHsgdGV4dDogY2hhcmFjdGVyIH0sIGN1cnJlbnRUZXh0U3R5bGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3Rlc3RUZXh0U3R5bGUgPSBnZXRTaW5nbGVUZXh0U3R5bGUodGV4dE5vZGUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0VGFibGVMZW5ndGggPSB0ZXh0VGFibGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChoYXNFcXVhbFByb3BlcnRpZXMoY3VycmVudFRleHRTdHlsZSwgbGFzdGVzdFRleHRTdHlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRhYmxlW3RleHRUYWJsZUxlbmd0aCAtIDFdLnRleHQgKz0gY2hhcmFjdGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRhYmxlLnB1c2goT2JqZWN0LmFzc2lnbih7IHRleHQ6IGNoYXJhY3RlciB9LCBsYXN0ZXN0VGV4dFN0eWxlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0U3R5bGUgPSBsYXN0ZXN0VGV4dFN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRleHRUYWJsZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGVUZXh0U3R5bGUodGV4dE5vZGUpO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBnZXRUZXh0Tm9kZVN0eWxlIH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB7IGdldEZpbGxTdHlsZSwgZ2V0VGV4dFN0eWxlLCBnZXRFZmZlY3RTdHlsZSwgZ2V0R3JpZFN0eWxlIH0gZnJvbSAnLi9zdHlsZSc7XG5jb25zdCBub2RlVHlwZU1hcHMgPSB7XG4gICAgUE9MWUdPTjogJ1JFR1VMQVJfUE9MWUdPTicsXG4gICAgUEFHRTogJ0NBTlZBUycsXG59O1xuY29uc3QgZ2V0U3R5bGVzID0gbm9kZSA9PiB7XG4gICAgaWYgKCFub2RlLmZpbGxTdHlsZUlkICYmICFub2RlLnRleHRTdHlsZUlkICYmICFub2RlLnN0cm9rZVN0eWxlSWQgJiYgIW5vZGUuZWZmZWN0U3R5bGVJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgIG5vZGUuZmlsbFN0eWxlSWQgJiYgdHlwZW9mIG5vZGUuZmlsbFN0eWxlSWQgIT09ICdzeW1ib2wnICYmIChzdHlsZXMuZmlsbCA9IG5vZGUuZmlsbFN0eWxlSWQpO1xuICAgIG5vZGUudGV4dFN0eWxlSWQgJiYgdHlwZW9mIG5vZGUudGV4dFN0eWxlSWQgIT09ICdzeW1ib2wnICYmIChzdHlsZXMudGV4dCA9IG5vZGUudGV4dFN0eWxlSWQpO1xuICAgIG5vZGUuc3Ryb2tlU3R5bGVJZCAmJiAoc3R5bGVzLnN0cm9rZSA9IG5vZGUuc3Ryb2tlU3R5bGVJZCk7XG4gICAgbm9kZS5lZmZlY3RTdHlsZUlkICYmIChzdHlsZXMuZWZmZWN0ID0gbm9kZS5lZmZlY3RTdHlsZUlkKTtcbiAgICByZXR1cm4gc3R5bGVzO1xufTtcbmNvbnN0IGFzc2lnblByb3BlcnRpZXMgPSAodHJlZU5vZGUsIG5vZGUpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IFtcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnbG9ja2VkJyxcbiAgICAgICAgJ2JsZW5kTW9kZScsXG4gICAgICAgICdzaXplJyxcbiAgICAgICAgJ2NsaXBzQ29udGVudCcsXG4gICAgICAgICdyZWxhdGl2ZVRyYW5zZm9ybScsXG4gICAgICAgICdlZmZlY3RzJyxcbiAgICAgICAgJ2lzTWFzaycsXG4gICAgICAgICdpc01hc2tPdXRsaW5lJyxcbiAgICAgICAgJ2Jvb2xlYW5PcGVyYXRpb24nLFxuICAgIF07XG4gICAgaWYgKG5vZGUub3BhY2l0eSAhPT0gMSAmJiBub2RlLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cmVlTm9kZS5vcGFjaXR5ID0gbm9kZS5vcGFjaXR5O1xuICAgIH1cbiAgICBhbGxvd2VkUHJvcGVydGllcy5tYXAocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAobm9kZVtwcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHJlZU5vZGVbcHJvcGVydHldID0gbm9kZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5jb25zdCBoYW5kbGVFeHBvcnRTZXR0aW5ncyA9ICh0cmVlTm9kZSwgbm9kZSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAobm9kZS5leHBvcnRTZXR0aW5ncykge1xuICAgICAgICB0cmVlTm9kZS5leHBvcnRTZXR0aW5ncyA9IG5vZGUuZXhwb3J0U2V0dGluZ3M7XG4gICAgICAgIGlmIChub2RlLmV4cG9ydFNldHRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobm9kZS5leHBvcnRTZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgaGFuZGxlQm91bmRpbmdCb3ggPSAodHJlZU5vZGUsIG5vZGUsIHR5cGUpID0+IHtcbiAgICBpZiAodHlwZSAhPT0gJ0NBTlZBUycgJiYgdHlwZSAhPT0gJ0RPQ1VNRU5UJykge1xuICAgICAgICB0cmVlTm9kZS5hYnNvbHV0ZUJvdW5kaW5nQm94ID0ge1xuICAgICAgICAgICAgeDogbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybVswXVsyXSxcbiAgICAgICAgICAgIHk6IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl0sXG4gICAgICAgICAgICB3aWR0aDogbm9kZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IGhhbmRsZUNvcm5lclJhZGl1cyA9ICh0cmVlTm9kZSwgbm9kZSkgPT4ge1xuICAgIGlmIChub2RlLmNvcm5lclJhZGl1cykge1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUuY29ybmVyUmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdHJlZU5vZGUuY29ybmVyUmFkaXVzID0gbm9kZS5jb3JuZXJSYWRpdXM7XG4gICAgICAgICAgICB0cmVlTm9kZS5yZWN0YW5nbGVDb3JuZXJSYWRpaSA9IEFycmF5LmZyb20oQXJyYXkoNCksICgpID0+IG5vZGUuY29ybmVyUmFkaXVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyZWVOb2RlLnJlY3RhbmdsZUNvcm5lclJhZGlpID0gW1xuICAgICAgICAgICAgICAgIG5vZGUudG9wTGVmdFJhZGl1cyxcbiAgICAgICAgICAgICAgICBub2RlLnRvcFJpZ2h0UmFkaXVzLFxuICAgICAgICAgICAgICAgIG5vZGUuYm90dG9tUmlnaHRSYWRpdXMsXG4gICAgICAgICAgICAgICAgbm9kZS5ib3R0b21MZWZ0UmFkaXVzLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBoYW5kbGVTdHlsZSA9ICh0cmVlTm9kZSwgbm9kZSkgPT4ge1xuICAgIGlmIChub2RlLmZpbGxzICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG5vZGUuZmlsbHMgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHRyZWVOb2RlLmZpbGxzID0gbm9kZS5maWxscztcbiAgICB9XG4gICAgaWYgKG5vZGUuc3Ryb2tlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyZWVOb2RlLnN0cm9rZXMgPSBub2RlLnN0cm9rZXM7XG4gICAgICAgIHRyZWVOb2RlLnN0cm9rZVdlaWdodCA9IHRyZWVOb2RlLnN0cm9rZVdlaWdodCAhPT0gdW5kZWZpbmVkID8gdHJlZU5vZGUuc3Ryb2tlV2VpZ2h0IDogMTtcbiAgICAgICAgdHJlZU5vZGUuc3Ryb2tlQWxpZ24gPSB0cmVlTm9kZS5zdHJva2VBbGlnbiB8fCAnSU5TSURFJztcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKG5vZGUpO1xuICAgIGlmIChzdHlsZXMpIHtcbiAgICAgICAgdHJlZU5vZGUuc3R5bGVzID0gc3R5bGVzO1xuICAgIH1cbn07XG5jb25zdCBoYW5kbGVTcGVjaWFsTm9kZSA9ICh0cmVlTm9kZSwgbm9kZSwgdHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdDQU5WQVMnOlxuICAgICAgICAgICAgdHJlZU5vZGUuYmFja2dyb3VuZENvbG9yID0gbm9kZS5iYWNrZ3JvdW5kc1swXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdURVhUJzpcbiAgICAgICAgICAgIHRyZWVOb2RlLmNoYXJhY3RlcnMgPSBub2RlLmNoYXJhY3RlcnM7XG4gICAgICAgICAgICBjb25zdCB0ZXh0U3R5bGUgPSBnZXRUZXh0Tm9kZVN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgY29uc3QgaXNNaXhlZFRleHQgPSBBcnJheS5pc0FycmF5KHRleHRTdHlsZSk7XG4gICAgICAgICAgICB0cmVlTm9kZS5pc01peGVkVGV4dCA9IGlzTWl4ZWRUZXh0O1xuICAgICAgICAgICAgaWYgKGlzTWl4ZWRUZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRleHRTdHlsZVswXSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZpcnN0U3R5bGUudGV4dDtcbiAgICAgICAgICAgICAgICB0cmVlTm9kZS5zdHlsZSA9IGZpcnN0U3R5bGU7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUudGV4dFRhYmxlID0gdGV4dFN0eWxlO1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLmZpbGxzID0gdGV4dFN0eWxlWzBdLmZpbGxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUudGV4dFRhYmxlID0gW107XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuc3R5bGUgPSB0ZXh0U3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSU5TVEFOQ0UnOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0cmVlTm9kZS5jb21wb25lbnRJZCA9IG5vZGUubWFzdGVyQ29tcG9uZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHdhbGtEb2N1bWVudCA9IChkb2N1bWVudCwgc2VsZWN0ZWRGcmFtZUtleXMsIGluY2x1ZGVDb21wb25lbnRzKSA9PiB7XG4gICAgY29uc3QgZmlsZURhdGEgPSB7XG4gICAgICAgIGlzRnJvbVBsdWdpbjogdHJ1ZSxcbiAgICAgICAgbmFtZTogZG9jdW1lbnQubmFtZSxcbiAgICAgICAgZG9jdW1lbnQ6IHt9LFxuICAgIH07XG4gICAgbGV0IGNvbXBvbmVudE5vZGVzID0gW107XG4gICAgY29uc3QgZnJhbWVOb2RlcyA9IFtdO1xuICAgIGNvbnN0IGV4cG9ydFNldHRpbmdOb2RlcyA9IFtdO1xuICAgIGNvbnN0IGV4cG9ydFNldHRpbmdzID0gW107XG4gICAgY29uc3Qgc3RlcCA9IChub2RlLCBpc1N0ZXBwaW5nQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBub2RlVHlwZU1hcHNbbm9kZS50eXBlXSB8fCBub2RlLnR5cGU7XG4gICAgICAgIGNvbnN0IHRyZWVOb2RlID0ge1xuICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICB9O1xuICAgICAgICBhc3NpZ25Qcm9wZXJ0aWVzKHRyZWVOb2RlLCBub2RlKTtcbiAgICAgICAgaGFuZGxlU3BlY2lhbE5vZGUodHJlZU5vZGUsIG5vZGUsIHR5cGUpO1xuICAgICAgICBoYW5kbGVTdHlsZSh0cmVlTm9kZSwgbm9kZSk7XG4gICAgICAgIGhhbmRsZUNvcm5lclJhZGl1cyh0cmVlTm9kZSwgbm9kZSk7XG4gICAgICAgIGhhbmRsZUJvdW5kaW5nQm94KHRyZWVOb2RlLCBub2RlLCB0eXBlKTtcbiAgICAgICAgaGFuZGxlRXhwb3J0U2V0dGluZ3ModHJlZU5vZGUsIG5vZGUsIGltYWdlRXhwb3J0U2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgaWYgKCFpc1N0ZXBwaW5nQ29tcG9uZW50ICYmIG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGltYWdlRXhwb3J0U2V0dGluZ3MubWFwKGltYWdlRXhwb3J0U2V0dGluZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydFNldHRpbmdOb2Rlcy5wdXNoKHsgZXhwb3J0VHlwZTogJ2V4cG9ydFNldHRpbmcnLCBub2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICBleHBvcnRTZXR0aW5ncy5wdXNoKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaW1hZ2VFeHBvcnRTZXR0aW5nKSwgeyBpZDogbm9kZS5pZCwgbmFtZTogbm9kZS5uYW1lIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0cmVlTm9kZS5jaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQXJ0Ym9hcmQgPSBub2RlLnBhcmVudC50eXBlID09PSAnUEFHRScgJiYgbm9kZS50eXBlID09PSAnRlJBTUUnO1xuICAgICAgICAgICAgICAgIGlzQXJ0Ym9hcmQgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRGcmFtZUtleXMuaW5kZXhPZihub2RlLmlkKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lTm9kZXMucHVzaCh7IGV4cG9ydFR5cGU6ICdmcmFtZScsIG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQXJ0Ym9hcmQgPyBzZWxlY3RlZEZyYW1lS2V5cy5pbmRleE9mKG5vZGUuaWQpID4gLTEgOiBub2RlLnBhcmVudC50eXBlICE9PSAnUEFHRSc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAobm9kZSA9PiBzdGVwKG5vZGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJlZU5vZGU7XG4gICAgfTtcbiAgICBmaWxlRGF0YS5zdHlsZXMgPSB7XG4gICAgICAgIEZJTEw6IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0RmlsbFN0eWxlKHN0eWxlKSksXG4gICAgICAgIFRFWFQ6IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpLm1hcChzdHlsZSA9PiBnZXRUZXh0U3R5bGUoc3R5bGUpKSxcbiAgICAgICAgRUZGRUNUOiBmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpLm1hcChzdHlsZSA9PiBnZXRFZmZlY3RTdHlsZShzdHlsZSkpLFxuICAgICAgICBHUklEOiBmaWdtYS5nZXRMb2NhbEdyaWRTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0R3JpZFN0eWxlKHN0eWxlKSksXG4gICAgfTtcbiAgICBjb21wb25lbnROb2RlcyA9IGRvY3VtZW50XG4gICAgICAgIC5maW5kQWxsKGMgPT4gYy50eXBlID09PSAnQ09NUE9ORU5UJyAmJiBjLnZpc2libGUpXG4gICAgICAgIC5tYXAobm9kZSA9PiAoeyBleHBvcnRUeXBlOiAnY29tcG9uZW50Jywgbm9kZSB9KSk7XG4gICAgZmlsZURhdGEuY29tcG9uZW50cyA9IGNvbXBvbmVudE5vZGVzLm1hcCgoeyBub2RlIH0pID0+IGluY2x1ZGVDb21wb25lbnRzID8gc3RlcChub2RlLCB0cnVlKSA6IHsgaWQ6IG5vZGUuaWQsIG5hbWU6IG5vZGUubmFtZSwgZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24gfSk7XG4gICAgZmlsZURhdGEuZG9jdW1lbnQgPSBzdGVwKGRvY3VtZW50KTtcbiAgICBmaWxlRGF0YS5leHBvcnRTZXR0aW5ncyA9IGV4cG9ydFNldHRpbmdzO1xuICAgIHJldHVybiB7IGZpbGVEYXRhLCBmcmFtZU5vZGVzLCBleHBvcnRTZXR0aW5nTm9kZXMsIGNvbXBvbmVudE5vZGVzIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==