import {isVisibleNode, getFileName, getConventionName, renameImages} from './helper';
import {getTextNodeStyle} from './text';
import {getFillStyle, getTextStyle, getEffectStyle, getGridStyle} from './style';
import {handleError} from './export';

interface FileData {
  isFromPlugin: boolean;
  name: string;
  document: object;
  [propName: string]: any;
}

interface TreeNode {
  id: string;
  name: string;
  type: string;
  [propName: string]: any;
}

interface Styles {
  fill?: string;
  stroke?: string;
  effect?: string;
  text?: string;
}

// map node type
const nodeTypeMaps = {
  POLYGON: 'REGULAR_POLYGON',
  PAGE: 'CANVAS'
};

const getStyles = node => {
  if (!node.fillStyleId && !node.textStyleId && !node.strokeStyleId && !node.effectStyleId) {
    return false;
  }
  const styles: Styles = {};
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
    // store all exports
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
  try {
    if (node.cornerRadius) {
      // four corners equal
      if (typeof node.cornerRadius === 'number') {
        treeNode.cornerRadius = node.cornerRadius;
        treeNode.rectangleCornerRadii = Array.from(Array(4), () => node.cornerRadius);
      } else {
        // four corners not equal
        treeNode.rectangleCornerRadii = [
          node.topLeftRadius,
          node.topRightRadius,
          node.bottomRightRadius,
          node.bottomLeftRadius
        ];
      }
    }
  } catch (err) {
    handleError(node);
    console.log(err);
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
      const textStyle = getTextNodeStyle(node);
      const isMixedText = Array.isArray(textStyle);
      treeNode.isMixedText = isMixedText;
      if (isMixedText) {
        const firstStyle = {...textStyle[0]};
        delete firstStyle.text;
        treeNode.style = firstStyle;
        treeNode.textTable = textStyle;
        treeNode.fills = textStyle[0].fills;
      } else {
        treeNode.textTable = [];
        treeNode.style = textStyle;
      }
      break;
    case 'INSTANCE':
      try {
        treeNode.componentId = node.masterComponent.id;
      } catch (err) {
        handleError(node);
        console.log(err);
      }
      break;
  }
};

// walk file to get file data
export const walkDocument = (document, selectedFrameKeys, globalData) => {
  const {includeComponents, convention, overrideRepeatedImages, imagesConvention} = globalData;
  const fileData: FileData = {
    isFromPlugin: true,
    name: document.name,
    document: {}
  };
  let componentNodes = [];
  const frameNodes = [];
  const exportSettingNodes = [];
  let exportSettings = [];

  const step = (node, isSteppingComponent?) => {
    const type = nodeTypeMaps[node.type] || node.type;
    const treeNode: TreeNode = {
      id: node.id,
      name: isSteppingComponent ? getConventionName(node.name, convention) : node.name,
      type
    };
    assignProperties(treeNode, node);
    handleSpecialNode(treeNode, node, type);
    handleStyle(treeNode, node);
    handleCornerRadius(treeNode, node);
    handleBoundingBox(treeNode, node, type);
    handleExportSettings(treeNode, node, nodeExportSettings => {
      // should not export if isn't visible (also if a ancestor is not visible) or is mask
      if (!isSteppingComponent && isVisibleNode(node) && !node.isMask) {
        nodeExportSettings.map(nodeExportSetting => {
          const extendedExportSetting = {...nodeExportSetting, id: node.id, name: node.name};
          let exportedImageName = getFileName(extendedExportSetting, imagesConvention);
          extendedExportSetting.fileName = exportedImageName;
          if (
            !(overrideRepeatedImages && exportSettings.map(({fileName}) => fileName).indexOf(exportedImageName) > -1)
          ) {
            exportSettings.push(extendedExportSetting);
            exportSettingNodes.push({exportType: 'exportSetting', node});
          }
        });
      }
    });

    if (node.children) {
      treeNode.children = node.children
        .filter(node => {
          // exclude frames that are not selected
          const isArtboard = node.parent.type === 'PAGE' && node.type === 'FRAME';
          isArtboard && selectedFrameKeys.indexOf(node.id) > -1 && frameNodes.push({exportType: 'frame', node});
          return isArtboard ? selectedFrameKeys.indexOf(node.id) > -1 : node.parent.type !== 'PAGE';
        })
        .map(node => step(node));
    }
    return treeNode;
  };

  // handle styles
  fileData.styles = {
    FILL: figma.getLocalPaintStyles().map(style => getFillStyle(style, convention)),
    TEXT: figma.getLocalTextStyles().map(style => getTextStyle(style, convention)),
    EFFECT: figma.getLocalEffectStyles().map(style => getEffectStyle(style, convention)),
    GRID: figma.getLocalGridStyles().map(style => getGridStyle(style, convention))
  };
  // step in components
  componentNodes = document
    .findAll(c => c.type === 'COMPONENT' && c.visible)
    .map(node => ({exportType: 'component', node}));
  fileData.components = componentNodes.map(({node}) =>
    includeComponents
      ? step(node, true)
      : {id: node.id, name: getConventionName(node.name, convention), description: node.description}
  );
  // start to step in document
  fileData.document = step(document);
  if (!overrideRepeatedImages) {
    const renamedNames = renameImages(exportSettings.map(({fileName}) => fileName));
    exportSettings = exportSettings.map((exportSetting, index) => ({...exportSetting, fileName: renamedNames[index]}));
  }
  fileData.exportSettings = exportSettings;
  return {fileData, frameNodes, exportSettingNodes, componentNodes};
};
