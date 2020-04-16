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
                currentPageKey: figma.currentPage.id
            }
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
            message: { fileData, pagedFrames, selectedFrameKeys, includeComponents, useHDImages }
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
                type: "SCALE",
                value: useHDImages ? 2 : 1
            }
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${frameNode.id}.png`);
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
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
                type: "SCALE",
                value: useHDImages ? 2 : 1
            }
        });
        const fileName = Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["trimFilePath"])(`${componentNode.id}.png`);
        Object(_utils_helper__WEBPACK_IMPORTED_MODULE_0__["sendMessage"])({
            type: 'bg:image-exported',
            message: {
                imgData,
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
            .filter(({ key }) => checkedKeys ? checkedKeys.indexOf(key) > -1 : true)
            .map(({ key }) => {
            frameKeys.push(key);
        });
    });
    return frameKeys;
};
const getSelectedPagedFrames = (frames, checkedKeys) => {
    const pagedFrames = {};
    frames
        .map(({ key, title, children }) => {
        const selectedFrames = children.filter(({ key }) => checkedKeys.indexOf(key) > -1);
        if (selectedFrames.length) {
            pagedFrames[key] = {
                name: title,
                frames: selectedFrames
                    .map(({ key, title }) => ({
                    id: key,
                    name: title
                }))
            };
        }
    });
    return pagedFrames;
};
const getPageKeys = frames => {
    const pageKeys = frames
        .map(({ key }) => key);
    return pageKeys;
};
const getAllPagedFrames = document => document.children
    .map(page => ({
    key: page.id,
    title: page.name,
    children: page.children
        .filter(({ type, visible }) => type === 'FRAME' && visible)
        .map(frame => ({
        key: frame.id, title: frame.name
    }))
        .reverse()
}))
    .filter(page => !!page.children.length);
const getCurrentPageFrameKeys = currentPage => currentPage.children
    .filter(({ type, visible }) => type === 'FRAME' && visible)
    .map(frame => frame.id);


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
    items: style.paints
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
        lineHeightUnit: style.lineHeight.unit
    }
});
const getEffectStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'EFFECT',
    items: style.effects
});
const getGridStyle = style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    styleType: 'GRID',
    items: style.layoutGrids
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
    Ultralight: "ultralight",
    "100": "ultralight",
    Thin: "thin",
    "200": "thin",
    Light: "light",
    "300": "light",
    Normal: "regular",
    Regular: "regular",
    "400": "regular",
    Medium: "medium",
    Semibold: "semibold",
    Demibold: "semibold",
    "500": "semibold",
    "600": "semibold",
    Bold: "bold",
    "700": "bold",
    Extrabold: "heavy",
    Ultrabold: "heavy",
    Heavy: "heavy",
    "800": "heavy",
    Black: "black",
    "900": "bacl"
};
const compareStyles = (style1, style2) => {
    const props1 = Object.getOwnPropertyNames(style1);
    const props2 = Object.getOwnPropertyNames(style2);
    if (props1.length !== props2.length)
        return false;
    for (const p in style1) {
        if (style1.hasOwnProperty(p) !== style2.hasOwnProperty(p))
            return false;
        switch (typeof (style1[p])) {
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
    return !![fontName, fontSize, lineHeight, textDecoration, letterSpacing, fills].
        filter(arg => typeof arg === 'symbol').length;
};
const hasEqualProperties = (style, anotherStyle) => {
    if (style.fillStyleId && anotherStyle.fillStyleId &&
        style.textStyleId && anotherStyle.textStyleId &&
        style.fillStyleId === anotherStyle.fillStyleId &&
        style.textStyleId === anotherStyle.textStyleId) {
        return true;
    }
    else if (!style.fillStyleId && !anotherStyle.fillStyleId &&
        !style.textStyleId && !anotherStyle.textStyleId) {
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
    node.fillStyleId && (typeof node.fillStyleId !== 'symbol') && (styles.fill = node.fillStyleId);
    node.textStyleId && (typeof node.textStyleId !== 'symbol') && (styles.text = node.textStyleId);
    node.strokeStyleId && (styles.stroke = node.strokeStyleId);
    node.effectStyleId && (styles.effect = node.effectStyleId);
    return styles;
};
const assignProperties = (treeNode, node) => {
    const allowedProperties = [
        'visible', 'locked', 'blendMode', 'size', 'clipsContent', 'relativeTransform', 'effects',
        'isMask', 'isMaskOutline', 'booleanOperation'
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
            treeNode.rectangleCornerRadii = [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius];
        }
    }
};
const handleStyle = (treeNode, node) => {
    if (node.fills !== undefined && (typeof node.fills !== 'symbol')) {
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
            treeNode.componentId = node.masterComponent.id;
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
                return isArtboard ? selectedFrameKeys.indexOf(node.id) > -1 : true;
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
    fileData.components = componentNodes.map(({ node }) => includeComponents ?
        step(node, true) :
        { id: node.id, name: node.name, description: node.description });
    fileData.document = step(document);
    fileData.exportSettings = exportSettings;
    return { fileData, frameNodes, exportSettingNodes, componentNodes };
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9leHBvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2ZyYW1lcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvd2Fsay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw4REFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxvQ0FBb0M7QUFDakYsc0VBQXNFLHdCQUF3QiwrQkFBK0I7QUFDN0gsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLDRCQUE0QjtBQUN0SDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELDJEQUFZO0FBQ25FLHNEQUFzRCwyREFBWTtBQUNsRSwwREFBMEQsNkRBQWM7QUFDeEUsc0RBQXNELDJEQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQ0FBZ0M7QUFDdkQsK0NBQStDLE9BQU87QUFDdEQ7QUFDQSxTQUFTLDhEQUE4RDtBQUN2RTtBQUNBO0FBQ0EsWUFBWTtBQUNaIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0QWxsUGFnZWRGcmFtZXMsIGdldEN1cnJlbnRQYWdlRnJhbWVLZXlzIH0gZnJvbSAnLi4vdXRpbHMvZnJhbWVzJztcbmltcG9ydCB7IHNlbmRNZXNzYWdlIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyJztcbmltcG9ydCB7IGV4cG9ydEZyYW1lLCBleHBvcnRDb21wb25lbnQsIGV4cG9ydEV4cG9ydFNldHRpbmcgfSBmcm9tICcuLi91dGlscy9leHBvcnQnO1xuaW1wb3J0IHsgd2Fsa0RvY3VtZW50IH0gZnJvbSAnLi4vdXRpbHMvd2Fsayc7XG5sZXQgZmlsZURhdGEsIHVzZUhESW1hZ2VzLCBpbmNsdWRlQ29tcG9uZW50cztcbmxldCBmcmFtZU5vZGVzID0gW10sIGV4cG9ydFNldHRpbmdOb2RlcyA9IFtdLCBjb21wb25lbnROb2RlcyA9IFtdLCBleHBvcnROb2RlcyA9IFtdO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzMDAsIGhlaWdodDogNDgwIH0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG1zZy50eXBlID09PSAndWk6c2V0LXdlbGNvbWVkJykge1xuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCd3ZWxjb21lZCcsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3VpOmdldC13ZWxjb21lZCcpIHtcbiAgICAgICAgY29uc3Qgd2VsY29tZWQgPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCd3ZWxjb21lZCcpO1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6d2VsY29tZWQtZ290JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgd2VsY29tZWQgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAndWk6Z2V0LWZyYW1lcycpIHtcbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2JnOmZyYW1lcy1nb3QnLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGFsbEZyYW1lczogZ2V0QWxsUGFnZWRGcmFtZXMoZmlnbWEucm9vdCksXG4gICAgICAgICAgICAgICAgY3VycmVudEZyYW1lczogZ2V0Q3VycmVudFBhZ2VGcmFtZUtleXMoZmlnbWEuY3VycmVudFBhZ2UpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlS2V5OiBmaWdtYS5jdXJyZW50UGFnZS5pZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1aTpnZXQtZG9jdW1lbnQnKSB7XG4gICAgICAgIGNvbnN0IHsgcGFnZWRGcmFtZXMsIHNlbGVjdGVkRnJhbWVLZXlzLCBpbmNsdWRlQ29tcG9uZW50czogd2l0aENvbXBvbmVudHMsIHVzZUhESW1hZ2VzOiB1c2VIRCB9ID0gbXNnO1xuICAgICAgICBjb25zdCBkYXRhID0gd2Fsa0RvY3VtZW50KGZpZ21hLnJvb3QsIHNlbGVjdGVkRnJhbWVLZXlzLCB3aXRoQ29tcG9uZW50cyk7XG4gICAgICAgIGZpbGVEYXRhID0gZGF0YS5maWxlRGF0YTtcbiAgICAgICAgaW5jbHVkZUNvbXBvbmVudHMgPSB3aXRoQ29tcG9uZW50cztcbiAgICAgICAgdXNlSERJbWFnZXMgPSB1c2VIRDtcbiAgICAgICAgZnJhbWVOb2RlcyA9IGRhdGEuZnJhbWVOb2RlcztcbiAgICAgICAgZXhwb3J0U2V0dGluZ05vZGVzID0gZGF0YS5leHBvcnRTZXR0aW5nTm9kZXM7XG4gICAgICAgIGNvbXBvbmVudE5vZGVzID0gZGF0YS5jb21wb25lbnROb2RlcztcbiAgICAgICAgZXhwb3J0Tm9kZXMgPSBmcmFtZU5vZGVzLmNvbmNhdChleHBvcnRTZXR0aW5nTm9kZXMsIGluY2x1ZGVDb21wb25lbnRzID8gY29tcG9uZW50Tm9kZXMgOiBbXSk7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdiZzpkb2N1bWVudC1nb3QnLFxuICAgICAgICAgICAgbWVzc2FnZTogeyBmaWxlRGF0YSwgcGFnZWRGcmFtZXMsIHNlbGVjdGVkRnJhbWVLZXlzLCBpbmNsdWRlQ29tcG9uZW50cywgdXNlSERJbWFnZXMgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1aTpleHBvcnQtaW1hZ2UnKSB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IG1zZztcbiAgICAgICAgY29uc3QgeyBleHBvcnRUeXBlLCBub2RlIH0gPSBleHBvcnROb2Rlc1tpbmRleF07XG4gICAgICAgIHN3aXRjaCAoZXhwb3J0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZnJhbWUnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGV4cG9ydEZyYW1lKG5vZGUsIHVzZUhESW1hZ2VzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2V4cG9ydFNldHRpbmcnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGV4cG9ydEV4cG9ydFNldHRpbmcobm9kZSwgZmlsZURhdGEuZXhwb3J0U2V0dGluZ3MsIGluZGV4IC0gZnJhbWVOb2Rlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29tcG9uZW50JzpcbiAgICAgICAgICAgICAgICB5aWVsZCBleHBvcnRDb21wb25lbnQobm9kZSwgdXNlSERJbWFnZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IHNlbmRNZXNzYWdlLCB0cmltRmlsZVBhdGgsIGdldEZpbGVOYW1lIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyJztcbmV4cG9ydCBjb25zdCBleHBvcnRGcmFtZSA9IChmcmFtZU5vZGUsIHVzZUhESW1hZ2VzKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBpbWdEYXRhID0geWllbGQgZnJhbWVOb2RlLmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJTQ0FMRVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1c2VIREltYWdlcyA/IDIgOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRyaW1GaWxlUGF0aChgJHtmcmFtZU5vZGUuaWR9LnBuZ2ApO1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6aW1hZ2UtZXhwb3J0ZWQnLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGltZ0RhdGEsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZyYW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IGV4cG9ydEV4cG9ydFNldHRpbmcgPSAoZXhwb3J0Tm9kZSwgZXhwb3J0U2V0dGluZ3MsIGluZGV4KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBleHBvcnRTZXR0aW5nID0gT2JqZWN0LmFzc2lnbih7fSwgZXhwb3J0U2V0dGluZ3NbaW5kZXhdKTtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBnZXRGaWxlTmFtZShleHBvcnRTZXR0aW5nLCBpbmRleCk7XG4gICAgICAgIGRlbGV0ZSBleHBvcnRTZXR0aW5nLmlkO1xuICAgICAgICBkZWxldGUgZXhwb3J0U2V0dGluZy5uYW1lO1xuICAgICAgICBjb25zdCBpbWdEYXRhID0geWllbGQgZXhwb3J0Tm9kZS5leHBvcnRBc3luYyhleHBvcnRTZXR0aW5nKTtcbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2JnOmltYWdlLWV4cG9ydGVkJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICBpbWdEYXRhLFxuICAgICAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdleHBvcnRTZXR0aW5nJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGNvbnN0IGV4cG9ydENvbXBvbmVudCA9IChjb21wb25lbnROb2RlLCB1c2VIREltYWdlcykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IHlpZWxkIGNvbXBvbmVudE5vZGUuZXhwb3J0QXN5bmMoe1xuICAgICAgICAgICAgZm9ybWF0OiAnUE5HJyxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlNDQUxFXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVzZUhESW1hZ2VzID8gMiA6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdHJpbUZpbGVQYXRoKGAke2NvbXBvbmVudE5vZGUuaWR9LnBuZ2ApO1xuICAgICAgICBzZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAnYmc6aW1hZ2UtZXhwb3J0ZWQnLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGltZ0RhdGEsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBvbmVudCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59KTtcbiIsImV4cG9ydCBjb25zdCBnZXRGbGF0dGVuZWRGcmFtZUtleXMgPSAocGFnZWRGcmFtZXMsIGNoZWNrZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgZnJhbWVLZXlzID0gW107XG4gICAgcGFnZWRGcmFtZXMubWFwKCh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICAgIC5maWx0ZXIoKHsga2V5IH0pID0+IGNoZWNrZWRLZXlzID8gY2hlY2tlZEtleXMuaW5kZXhPZihrZXkpID4gLTEgOiB0cnVlKVxuICAgICAgICAgICAgLm1hcCgoeyBrZXkgfSkgPT4ge1xuICAgICAgICAgICAgZnJhbWVLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZyYW1lS2V5cztcbn07XG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRQYWdlZEZyYW1lcyA9IChmcmFtZXMsIGNoZWNrZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgcGFnZWRGcmFtZXMgPSB7fTtcbiAgICBmcmFtZXNcbiAgICAgICAgLm1hcCgoeyBrZXksIHRpdGxlLCBjaGlsZHJlbiB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRnJhbWVzID0gY2hpbGRyZW4uZmlsdGVyKCh7IGtleSB9KSA9PiBjaGVja2VkS2V5cy5pbmRleE9mKGtleSkgPiAtMSk7XG4gICAgICAgIGlmIChzZWxlY3RlZEZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhZ2VkRnJhbWVzW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgZnJhbWVzOiBzZWxlY3RlZEZyYW1lc1xuICAgICAgICAgICAgICAgICAgICAubWFwKCh7IGtleSwgdGl0bGUgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGl0bGVcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZWRGcmFtZXM7XG59O1xuZXhwb3J0IGNvbnN0IGdldFBhZ2VLZXlzID0gZnJhbWVzID0+IHtcbiAgICBjb25zdCBwYWdlS2V5cyA9IGZyYW1lc1xuICAgICAgICAubWFwKCh7IGtleSB9KSA9PiBrZXkpO1xuICAgIHJldHVybiBwYWdlS2V5cztcbn07XG5leHBvcnQgY29uc3QgZ2V0QWxsUGFnZWRGcmFtZXMgPSBkb2N1bWVudCA9PiBkb2N1bWVudC5jaGlsZHJlblxuICAgIC5tYXAocGFnZSA9PiAoe1xuICAgIGtleTogcGFnZS5pZCxcbiAgICB0aXRsZTogcGFnZS5uYW1lLFxuICAgIGNoaWxkcmVuOiBwYWdlLmNoaWxkcmVuXG4gICAgICAgIC5maWx0ZXIoKHsgdHlwZSwgdmlzaWJsZSB9KSA9PiB0eXBlID09PSAnRlJBTUUnICYmIHZpc2libGUpXG4gICAgICAgIC5tYXAoZnJhbWUgPT4gKHtcbiAgICAgICAga2V5OiBmcmFtZS5pZCwgdGl0bGU6IGZyYW1lLm5hbWVcbiAgICB9KSlcbiAgICAgICAgLnJldmVyc2UoKVxufSkpXG4gICAgLmZpbHRlcihwYWdlID0+ICEhcGFnZS5jaGlsZHJlbi5sZW5ndGgpO1xuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRQYWdlRnJhbWVLZXlzID0gY3VycmVudFBhZ2UgPT4gY3VycmVudFBhZ2UuY2hpbGRyZW5cbiAgICAuZmlsdGVyKCh7IHR5cGUsIHZpc2libGUgfSkgPT4gdHlwZSA9PT0gJ0ZSQU1FJyAmJiB2aXNpYmxlKVxuICAgIC5tYXAoZnJhbWUgPT4gZnJhbWUuaWQpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbn07XG5leHBvcnQgY29uc3QgYXN5bmNGb3JFYWNoID0gKGFycmF5LCBjYWxsYmFjaykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB5aWVsZCBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgdHJpbUZpbGVQYXRoID0gZmlsZVBhdGggPT4gZmlsZVBhdGgucmVwbGFjZSgvXFwvL2csICctJykucmVwbGFjZSgvOi9nLCAnLScpO1xuZXhwb3J0IGNvbnN0IGdldEZpbGVOYW1lID0gKGV4cG9ydFNldHRpbmcsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCBzdWZmaXgsIGZvcm1hdCwgY29uc3RyYWludCB9ID0gZXhwb3J0U2V0dGluZztcbiAgICBsZXQgZmlsZU5hbWUgPSBzdWZmaXggPyBgJHtuYW1lfS0ke3N1ZmZpeH1gIDogbmFtZTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmaWxlTmFtZSArPSBgLSR7aW5kZXh9YDtcbiAgICB9XG4gICAgY29uc3Qgc2NhbGUgPSBmb3JtYXQgPT09ICdTVkcnID8gJycgOiBgQCR7Y29uc3RyYWludC52YWx1ZX14YDtcbiAgICBjb25zdCBmaWxlRm9ybWF0ID0gZm9ybWF0LnRvTG93ZXJDYXNlKCk7XG4gICAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgcmV0dXJuIGAke3RyaW1GaWxlUGF0aChmaWxlTmFtZSl9JHtzY2FsZX0uJHtmaWxlRm9ybWF0fWA7XG59O1xuZXhwb3J0IGNvbnN0IGdldFNvdXJjZUNvZGUgPSB1cmwgPT4gZmV0Y2godXJsKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICByZXR1cm4geyBlcnI6IGVycm9yIH07XG59KTtcbmV4cG9ydCBjb25zdCBnZXRCdWZmZXJEYXRhID0gdXJsID0+IHtcbiAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgIHJldHVybiB7IGVycjogZXJyb3IgfTtcbiAgICB9KTtcbn07XG4iLCJpbXBvcnQgeyBGT05UX1dFSUdIVFMgfSBmcm9tICcuL3RleHQnO1xuZXhwb3J0IGNvbnN0IGdldEZpbGxTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ0ZJTEwnLFxuICAgIGl0ZW1zOiBzdHlsZS5wYWludHNcbn0pO1xuZXhwb3J0IGNvbnN0IGdldFRleHRTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ1RFWFQnLFxuICAgIGl0ZW1zOiB7XG4gICAgICAgIGZvbnRTaXplOiBzdHlsZS5mb250U2l6ZSxcbiAgICAgICAgZm9udEZhbWlseTogc3R5bGUuZm9udE5hbWUuZmFtaWx5LFxuICAgICAgICBmb250V2VpZ2h0OiBGT05UX1dFSUdIVFNbc3R5bGUuZm9udE5hbWUuc3R5bGVdIHx8IHN0eWxlLmZvbnROYW1lLnN0eWxlLFxuICAgICAgICB0ZXh0RGVjb3JhdGlvbjogc3R5bGUudGV4dERlY29yYXRpb24sXG4gICAgICAgIGxldHRlclNwYWNpbmc6IHN0eWxlLmxldHRlclNwYWNpbmcudmFsdWUsXG4gICAgICAgIGxldHRlclNwYWNpbmdVbml0OiBzdHlsZS5sZXR0ZXJTcGFjaW5nLnVuaXQsXG4gICAgICAgIGxpbmVIZWlnaHQ6IHN0eWxlLmxpbmVIZWlnaHQudmFsdWUsXG4gICAgICAgIGxpbmVIZWlnaHRVbml0OiBzdHlsZS5saW5lSGVpZ2h0LnVuaXRcbiAgICB9XG59KTtcbmV4cG9ydCBjb25zdCBnZXRFZmZlY3RTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ0VGRkVDVCcsXG4gICAgaXRlbXM6IHN0eWxlLmVmZmVjdHNcbn0pO1xuZXhwb3J0IGNvbnN0IGdldEdyaWRTdHlsZSA9IHN0eWxlID0+ICh7XG4gICAgaWQ6IHN0eWxlLmlkLFxuICAgIGtleTogc3R5bGUua2V5LFxuICAgIG5hbWU6IHN0eWxlLm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHN0eWxlLmRlc2NyaXB0aW9uLFxuICAgIHN0eWxlVHlwZTogJ0dSSUQnLFxuICAgIGl0ZW1zOiBzdHlsZS5sYXlvdXRHcmlkc1xufSk7XG4iLCJleHBvcnQgY29uc3QgRk9OVF9XRUlHSFRTID0ge1xuICAgIFVsdHJhbGlnaHQ6IFwidWx0cmFsaWdodFwiLFxuICAgIFwiMTAwXCI6IFwidWx0cmFsaWdodFwiLFxuICAgIFRoaW46IFwidGhpblwiLFxuICAgIFwiMjAwXCI6IFwidGhpblwiLFxuICAgIExpZ2h0OiBcImxpZ2h0XCIsXG4gICAgXCIzMDBcIjogXCJsaWdodFwiLFxuICAgIE5vcm1hbDogXCJyZWd1bGFyXCIsXG4gICAgUmVndWxhcjogXCJyZWd1bGFyXCIsXG4gICAgXCI0MDBcIjogXCJyZWd1bGFyXCIsXG4gICAgTWVkaXVtOiBcIm1lZGl1bVwiLFxuICAgIFNlbWlib2xkOiBcInNlbWlib2xkXCIsXG4gICAgRGVtaWJvbGQ6IFwic2VtaWJvbGRcIixcbiAgICBcIjUwMFwiOiBcInNlbWlib2xkXCIsXG4gICAgXCI2MDBcIjogXCJzZW1pYm9sZFwiLFxuICAgIEJvbGQ6IFwiYm9sZFwiLFxuICAgIFwiNzAwXCI6IFwiYm9sZFwiLFxuICAgIEV4dHJhYm9sZDogXCJoZWF2eVwiLFxuICAgIFVsdHJhYm9sZDogXCJoZWF2eVwiLFxuICAgIEhlYXZ5OiBcImhlYXZ5XCIsXG4gICAgXCI4MDBcIjogXCJoZWF2eVwiLFxuICAgIEJsYWNrOiBcImJsYWNrXCIsXG4gICAgXCI5MDBcIjogXCJiYWNsXCJcbn07XG5leHBvcnQgY29uc3QgY29tcGFyZVN0eWxlcyA9IChzdHlsZTEsIHN0eWxlMikgPT4ge1xuICAgIGNvbnN0IHByb3BzMSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN0eWxlMSk7XG4gICAgY29uc3QgcHJvcHMyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3R5bGUyKTtcbiAgICBpZiAocHJvcHMxLmxlbmd0aCAhPT0gcHJvcHMyLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoY29uc3QgcCBpbiBzdHlsZTEpIHtcbiAgICAgICAgaWYgKHN0eWxlMS5oYXNPd25Qcm9wZXJ0eShwKSAhPT0gc3R5bGUyLmhhc093blByb3BlcnR5KHApKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiAoc3R5bGUxW3BdKSkge1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVTdHlsZXMoc3R5bGUxW3BdLCBzdHlsZTJbcF0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChzdHlsZTFbcF0gIT09IHN0eWxlMltwXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbmV4cG9ydCBjb25zdCBoYXNTeW1ib2xQcm9wZXJ0aWVzID0gdGV4dE5vZGUgPT4ge1xuICAgIGNvbnN0IHsgZm9udE5hbWUsIGZvbnRTaXplLCBsaW5lSGVpZ2h0LCB0ZXh0RGVjb3JhdGlvbiwgbGV0dGVyU3BhY2luZywgZmlsbHMgfSA9IHRleHROb2RlO1xuICAgIHJldHVybiAhIVtmb250TmFtZSwgZm9udFNpemUsIGxpbmVIZWlnaHQsIHRleHREZWNvcmF0aW9uLCBsZXR0ZXJTcGFjaW5nLCBmaWxsc10uXG4gICAgICAgIGZpbHRlcihhcmcgPT4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcpLmxlbmd0aDtcbn07XG5leHBvcnQgY29uc3QgaGFzRXF1YWxQcm9wZXJ0aWVzID0gKHN0eWxlLCBhbm90aGVyU3R5bGUpID0+IHtcbiAgICBpZiAoc3R5bGUuZmlsbFN0eWxlSWQgJiYgYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgIHN0eWxlLnRleHRTdHlsZUlkICYmIGFub3RoZXJTdHlsZS50ZXh0U3R5bGVJZCAmJlxuICAgICAgICBzdHlsZS5maWxsU3R5bGVJZCA9PT0gYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgIHN0eWxlLnRleHRTdHlsZUlkID09PSBhbm90aGVyU3R5bGUudGV4dFN0eWxlSWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFzdHlsZS5maWxsU3R5bGVJZCAmJiAhYW5vdGhlclN0eWxlLmZpbGxTdHlsZUlkICYmXG4gICAgICAgICFzdHlsZS50ZXh0U3R5bGVJZCAmJiAhYW5vdGhlclN0eWxlLnRleHRTdHlsZUlkKSB7XG4gICAgICAgIGNvbnN0IGlzVGhlU2FtZSA9IGNvbXBhcmVTdHlsZXMoc3R5bGUsIGFub3RoZXJTdHlsZSk7XG4gICAgICAgIHJldHVybiBpc1RoZVNhbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVUZXh0U3R5bGUgPSAodGV4dE5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZmlsbFN0eWxlSWQgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUuZmlsbFN0eWxlSWQgOiB0ZXh0Tm9kZS5nZXRSYW5nZUZpbGxTdHlsZUlkKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IHRleHRTdHlsZUlkID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLnRleHRTdHlsZUlkIDogdGV4dE5vZGUuZ2V0UmFuZ2VUZXh0U3R5bGVJZChpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5mb250U2l6ZSA6IHRleHROb2RlLmdldFJhbmdlRm9udFNpemUoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgZm9udE5hbWUgPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGV4dE5vZGUuZm9udE5hbWUgOiB0ZXh0Tm9kZS5nZXRSYW5nZUZvbnROYW1lKGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IHRleHREZWNvcmF0aW9uID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLnRleHREZWNvcmF0aW9uIDogdGV4dE5vZGUuZ2V0UmFuZ2VUZXh0RGVjb3JhdGlvbihpbmRleCwgaW5kZXggKyAxKTtcbiAgICBjb25zdCBsZXR0ZXJTcGFjaW5nID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmxldHRlclNwYWNpbmcgOiB0ZXh0Tm9kZS5nZXRSYW5nZUxldHRlclNwYWNpbmcoaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0ZXh0Tm9kZS5saW5lSGVpZ2h0IDogdGV4dE5vZGUuZ2V0UmFuZ2VMaW5lSGVpZ2h0KGluZGV4LCBpbmRleCArIDEpO1xuICAgIGNvbnN0IGZpbGxzID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRleHROb2RlLmZpbGxzIDogdGV4dE5vZGUuZ2V0UmFuZ2VGaWxscyhpbmRleCwgaW5kZXggKyAxKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaWxsU3R5bGVJZCxcbiAgICAgICAgdGV4dFN0eWxlSWQsXG4gICAgICAgIGZvbnRTaXplLFxuICAgICAgICBmb250RmFtaWx5OiBmb250TmFtZS5mYW1pbHksXG4gICAgICAgIGZvbnRXZWlnaHQ6IEZPTlRfV0VJR0hUU1tmb250TmFtZS5zdHlsZV0gfHwgZm9udE5hbWUuc3R5bGUsXG4gICAgICAgIHRleHREZWNvcmF0aW9uLFxuICAgICAgICBsZXR0ZXJTcGFjaW5nOiBsZXR0ZXJTcGFjaW5nLnZhbHVlLFxuICAgICAgICBsZXR0ZXJTcGFjaW5nVW5pdDogbGV0dGVyU3BhY2luZy51bml0LFxuICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0LnZhbHVlLFxuICAgICAgICBsaW5lSGVpZ2h0VW5pdDogbGluZUhlaWdodC51bml0LFxuICAgICAgICBmaWxscyxcbiAgICAgICAgdGV4dEFsaWduSG9yaXpvbnRhbDogdGV4dE5vZGUudGV4dEFsaWduSG9yaXpvbnRhbCxcbiAgICAgICAgdGV4dEFsaWduVmVydGljYWw6IHRleHROb2RlLnRleHRBbGlnblZlcnRpY2FsLFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGdldFRleHROb2RlU3R5bGUgPSB0ZXh0Tm9kZSA9PiB7XG4gICAgaWYgKGhhc1N5bWJvbFByb3BlcnRpZXModGV4dE5vZGUpKSB7XG4gICAgICAgIGNvbnN0IHRleHRUYWJsZSA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFRleHRTdHlsZTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHRleHROb2RlLmNoYXJhY3RlcnMsIChjaGFyYWN0ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dFN0eWxlID0gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgdGV4dFRhYmxlLnB1c2goT2JqZWN0LmFzc2lnbih7IHRleHQ6IGNoYXJhY3RlciB9LCBjdXJyZW50VGV4dFN0eWxlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0ZXN0VGV4dFN0eWxlID0gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dFRhYmxlTGVuZ3RoID0gdGV4dFRhYmxlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRXF1YWxQcm9wZXJ0aWVzKGN1cnJlbnRUZXh0U3R5bGUsIGxhc3Rlc3RUZXh0U3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRUYWJsZVt0ZXh0VGFibGVMZW5ndGggLSAxXS50ZXh0ICs9IGNoYXJhY3RlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRUYWJsZS5wdXNoKE9iamVjdC5hc3NpZ24oeyB0ZXh0OiBjaGFyYWN0ZXIgfSwgbGFzdGVzdFRleHRTdHlsZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dFN0eWxlID0gbGFzdGVzdFRleHRTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0ZXh0VGFibGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0U2luZ2xlVGV4dFN0eWxlKHRleHROb2RlKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgZ2V0VGV4dE5vZGVTdHlsZSB9IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgeyBnZXRGaWxsU3R5bGUsIGdldFRleHRTdHlsZSwgZ2V0RWZmZWN0U3R5bGUsIGdldEdyaWRTdHlsZSB9IGZyb20gJy4vc3R5bGUnO1xuY29uc3Qgbm9kZVR5cGVNYXBzID0ge1xuICAgIFBPTFlHT046ICdSRUdVTEFSX1BPTFlHT04nLFxuICAgIFBBR0U6ICdDQU5WQVMnXG59O1xuY29uc3QgZ2V0U3R5bGVzID0gbm9kZSA9PiB7XG4gICAgaWYgKCFub2RlLmZpbGxTdHlsZUlkICYmICFub2RlLnRleHRTdHlsZUlkICYmICFub2RlLnN0cm9rZVN0eWxlSWQgJiYgIW5vZGUuZWZmZWN0U3R5bGVJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgIG5vZGUuZmlsbFN0eWxlSWQgJiYgKHR5cGVvZiBub2RlLmZpbGxTdHlsZUlkICE9PSAnc3ltYm9sJykgJiYgKHN0eWxlcy5maWxsID0gbm9kZS5maWxsU3R5bGVJZCk7XG4gICAgbm9kZS50ZXh0U3R5bGVJZCAmJiAodHlwZW9mIG5vZGUudGV4dFN0eWxlSWQgIT09ICdzeW1ib2wnKSAmJiAoc3R5bGVzLnRleHQgPSBub2RlLnRleHRTdHlsZUlkKTtcbiAgICBub2RlLnN0cm9rZVN0eWxlSWQgJiYgKHN0eWxlcy5zdHJva2UgPSBub2RlLnN0cm9rZVN0eWxlSWQpO1xuICAgIG5vZGUuZWZmZWN0U3R5bGVJZCAmJiAoc3R5bGVzLmVmZmVjdCA9IG5vZGUuZWZmZWN0U3R5bGVJZCk7XG4gICAgcmV0dXJuIHN0eWxlcztcbn07XG5jb25zdCBhc3NpZ25Qcm9wZXJ0aWVzID0gKHRyZWVOb2RlLCBub2RlKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFByb3BlcnRpZXMgPSBbXG4gICAgICAgICd2aXNpYmxlJywgJ2xvY2tlZCcsICdibGVuZE1vZGUnLCAnc2l6ZScsICdjbGlwc0NvbnRlbnQnLCAncmVsYXRpdmVUcmFuc2Zvcm0nLCAnZWZmZWN0cycsXG4gICAgICAgICdpc01hc2snLCAnaXNNYXNrT3V0bGluZScsICdib29sZWFuT3BlcmF0aW9uJ1xuICAgIF07XG4gICAgaWYgKG5vZGUub3BhY2l0eSAhPT0gMSAmJiBub2RlLm9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cmVlTm9kZS5vcGFjaXR5ID0gbm9kZS5vcGFjaXR5O1xuICAgIH1cbiAgICBhbGxvd2VkUHJvcGVydGllcy5tYXAocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAobm9kZVtwcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHJlZU5vZGVbcHJvcGVydHldID0gbm9kZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5jb25zdCBoYW5kbGVFeHBvcnRTZXR0aW5ncyA9ICh0cmVlTm9kZSwgbm9kZSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAobm9kZS5leHBvcnRTZXR0aW5ncykge1xuICAgICAgICB0cmVlTm9kZS5leHBvcnRTZXR0aW5ncyA9IG5vZGUuZXhwb3J0U2V0dGluZ3M7XG4gICAgICAgIGlmIChub2RlLmV4cG9ydFNldHRpbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobm9kZS5leHBvcnRTZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgaGFuZGxlQm91bmRpbmdCb3ggPSAodHJlZU5vZGUsIG5vZGUsIHR5cGUpID0+IHtcbiAgICBpZiAodHlwZSAhPT0gJ0NBTlZBUycgJiYgdHlwZSAhPT0gJ0RPQ1VNRU5UJykge1xuICAgICAgICB0cmVlTm9kZS5hYnNvbHV0ZUJvdW5kaW5nQm94ID0ge1xuICAgICAgICAgICAgeDogbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybVswXVsyXSxcbiAgICAgICAgICAgIHk6IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl0sXG4gICAgICAgICAgICB3aWR0aDogbm9kZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICB9XG59O1xuY29uc3QgaGFuZGxlQ29ybmVyUmFkaXVzID0gKHRyZWVOb2RlLCBub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUuY29ybmVyUmFkaXVzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0cmVlTm9kZS5jb3JuZXJSYWRpdXMgPSBub2RlLmNvcm5lclJhZGl1cztcbiAgICAgICAgICAgIHRyZWVOb2RlLnJlY3RhbmdsZUNvcm5lclJhZGlpID0gQXJyYXkuZnJvbShBcnJheSg0KSwgKCkgPT4gbm9kZS5jb3JuZXJSYWRpdXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJlZU5vZGUucmVjdGFuZ2xlQ29ybmVyUmFkaWkgPSBbbm9kZS50b3BMZWZ0UmFkaXVzLCBub2RlLnRvcFJpZ2h0UmFkaXVzLCBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzLCBub2RlLmJvdHRvbUxlZnRSYWRpdXNdO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGhhbmRsZVN0eWxlID0gKHRyZWVOb2RlLCBub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUuZmlsbHMgIT09IHVuZGVmaW5lZCAmJiAodHlwZW9mIG5vZGUuZmlsbHMgIT09ICdzeW1ib2wnKSkge1xuICAgICAgICB0cmVlTm9kZS5maWxscyA9IG5vZGUuZmlsbHM7XG4gICAgfVxuICAgIGlmIChub2RlLnN0cm9rZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cmVlTm9kZS5zdHJva2VzID0gbm9kZS5zdHJva2VzO1xuICAgICAgICB0cmVlTm9kZS5zdHJva2VXZWlnaHQgPSB0cmVlTm9kZS5zdHJva2VXZWlnaHQgIT09IHVuZGVmaW5lZCA/IHRyZWVOb2RlLnN0cm9rZVdlaWdodCA6IDE7XG4gICAgICAgIHRyZWVOb2RlLnN0cm9rZUFsaWduID0gdHJlZU5vZGUuc3Ryb2tlQWxpZ24gfHwgJ0lOU0lERSc7XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyhub2RlKTtcbiAgICBpZiAoc3R5bGVzKSB7XG4gICAgICAgIHRyZWVOb2RlLnN0eWxlcyA9IHN0eWxlcztcbiAgICB9XG59O1xuY29uc3QgaGFuZGxlU3BlY2lhbE5vZGUgPSAodHJlZU5vZGUsIG5vZGUsIHR5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnQ0FOVkFTJzpcbiAgICAgICAgICAgIHRyZWVOb2RlLmJhY2tncm91bmRDb2xvciA9IG5vZGUuYmFja2dyb3VuZHNbMF07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVEVYVCc6XG4gICAgICAgICAgICB0cmVlTm9kZS5jaGFyYWN0ZXJzID0gbm9kZS5jaGFyYWN0ZXJzO1xuICAgICAgICAgICAgY29uc3QgdGV4dFN0eWxlID0gZ2V0VGV4dE5vZGVTdHlsZShub2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGlzTWl4ZWRUZXh0ID0gQXJyYXkuaXNBcnJheSh0ZXh0U3R5bGUpO1xuICAgICAgICAgICAgdHJlZU5vZGUuaXNNaXhlZFRleHQgPSBpc01peGVkVGV4dDtcbiAgICAgICAgICAgIGlmIChpc01peGVkVGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCB0ZXh0U3R5bGVbMF0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmaXJzdFN0eWxlLnRleHQ7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuc3R5bGUgPSBmaXJzdFN0eWxlO1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLnRleHRUYWJsZSA9IHRleHRTdHlsZTtcbiAgICAgICAgICAgICAgICB0cmVlTm9kZS5maWxscyA9IHRleHRTdHlsZVswXS5maWxscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLnRleHRUYWJsZSA9IFtdO1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLnN0eWxlID0gdGV4dFN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0lOU1RBTkNFJzpcbiAgICAgICAgICAgIHRyZWVOb2RlLmNvbXBvbmVudElkID0gbm9kZS5tYXN0ZXJDb21wb25lbnQuaWQ7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCB3YWxrRG9jdW1lbnQgPSAoZG9jdW1lbnQsIHNlbGVjdGVkRnJhbWVLZXlzLCBpbmNsdWRlQ29tcG9uZW50cykgPT4ge1xuICAgIGNvbnN0IGZpbGVEYXRhID0ge1xuICAgICAgICBpc0Zyb21QbHVnaW46IHRydWUsXG4gICAgICAgIG5hbWU6IGRvY3VtZW50Lm5hbWUsXG4gICAgICAgIGRvY3VtZW50OiB7fVxuICAgIH07XG4gICAgbGV0IGNvbXBvbmVudE5vZGVzID0gW107XG4gICAgY29uc3QgZnJhbWVOb2RlcyA9IFtdO1xuICAgIGNvbnN0IGV4cG9ydFNldHRpbmdOb2RlcyA9IFtdO1xuICAgIGNvbnN0IGV4cG9ydFNldHRpbmdzID0gW107XG4gICAgY29uc3Qgc3RlcCA9IChub2RlLCBpc1N0ZXBwaW5nQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBub2RlVHlwZU1hcHNbbm9kZS50eXBlXSB8fCBub2RlLnR5cGU7XG4gICAgICAgIGNvbnN0IHRyZWVOb2RlID0ge1xuICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgICAgICB0eXBlXG4gICAgICAgIH07XG4gICAgICAgIGFzc2lnblByb3BlcnRpZXModHJlZU5vZGUsIG5vZGUpO1xuICAgICAgICBoYW5kbGVTcGVjaWFsTm9kZSh0cmVlTm9kZSwgbm9kZSwgdHlwZSk7XG4gICAgICAgIGhhbmRsZVN0eWxlKHRyZWVOb2RlLCBub2RlKTtcbiAgICAgICAgaGFuZGxlQ29ybmVyUmFkaXVzKHRyZWVOb2RlLCBub2RlKTtcbiAgICAgICAgaGFuZGxlQm91bmRpbmdCb3godHJlZU5vZGUsIG5vZGUsIHR5cGUpO1xuICAgICAgICBoYW5kbGVFeHBvcnRTZXR0aW5ncyh0cmVlTm9kZSwgbm9kZSwgaW1hZ2VFeHBvcnRTZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzU3RlcHBpbmdDb21wb25lbnQgJiYgbm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VFeHBvcnRTZXR0aW5ncy5tYXAoaW1hZ2VFeHBvcnRTZXR0aW5nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0U2V0dGluZ05vZGVzLnB1c2goeyBleHBvcnRUeXBlOiAnZXhwb3J0U2V0dGluZycsIG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydFNldHRpbmdzLnB1c2goT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbWFnZUV4cG9ydFNldHRpbmcpLCB7IGlkOiBub2RlLmlkLCBuYW1lOiBub2RlLm5hbWUgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRyZWVOb2RlLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlblxuICAgICAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBcnRib2FyZCA9IG5vZGUucGFyZW50LnR5cGUgPT09ICdQQUdFJyAmJiBub2RlLnR5cGUgPT09ICdGUkFNRSc7XG4gICAgICAgICAgICAgICAgaXNBcnRib2FyZCAmJiBzZWxlY3RlZEZyYW1lS2V5cy5pbmRleE9mKG5vZGUuaWQpID4gLTEgJiYgZnJhbWVOb2Rlcy5wdXNoKHsgZXhwb3J0VHlwZTogJ2ZyYW1lJywgbm9kZSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNBcnRib2FyZCA/IHNlbGVjdGVkRnJhbWVLZXlzLmluZGV4T2Yobm9kZS5pZCkgPiAtMSA6IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAobm9kZSA9PiBzdGVwKG5vZGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJlZU5vZGU7XG4gICAgfTtcbiAgICBmaWxlRGF0YS5zdHlsZXMgPSB7XG4gICAgICAgIEZJTEw6IGZpZ21hLmdldExvY2FsUGFpbnRTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0RmlsbFN0eWxlKHN0eWxlKSksXG4gICAgICAgIFRFWFQ6IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpLm1hcChzdHlsZSA9PiBnZXRUZXh0U3R5bGUoc3R5bGUpKSxcbiAgICAgICAgRUZGRUNUOiBmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpLm1hcChzdHlsZSA9PiBnZXRFZmZlY3RTdHlsZShzdHlsZSkpLFxuICAgICAgICBHUklEOiBmaWdtYS5nZXRMb2NhbEdyaWRTdHlsZXMoKS5tYXAoc3R5bGUgPT4gZ2V0R3JpZFN0eWxlKHN0eWxlKSlcbiAgICB9O1xuICAgIGNvbXBvbmVudE5vZGVzID0gZG9jdW1lbnRcbiAgICAgICAgLmZpbmRBbGwoYyA9PiBjLnR5cGUgPT09ICdDT01QT05FTlQnICYmIGMudmlzaWJsZSlcbiAgICAgICAgLm1hcChub2RlID0+ICh7IGV4cG9ydFR5cGU6ICdjb21wb25lbnQnLCBub2RlIH0pKTtcbiAgICBmaWxlRGF0YS5jb21wb25lbnRzID0gY29tcG9uZW50Tm9kZXMubWFwKCh7IG5vZGUgfSkgPT4gaW5jbHVkZUNvbXBvbmVudHMgP1xuICAgICAgICBzdGVwKG5vZGUsIHRydWUpIDpcbiAgICAgICAgeyBpZDogbm9kZS5pZCwgbmFtZTogbm9kZS5uYW1lLCBkZXNjcmlwdGlvbjogbm9kZS5kZXNjcmlwdGlvbiB9KTtcbiAgICBmaWxlRGF0YS5kb2N1bWVudCA9IHN0ZXAoZG9jdW1lbnQpO1xuICAgIGZpbGVEYXRhLmV4cG9ydFNldHRpbmdzID0gZXhwb3J0U2V0dGluZ3M7XG4gICAgcmV0dXJuIHsgZmlsZURhdGEsIGZyYW1lTm9kZXMsIGV4cG9ydFNldHRpbmdOb2RlcywgY29tcG9uZW50Tm9kZXMgfTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9