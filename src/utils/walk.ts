import {isVisibleNode, getFileName, getConventionName, renameImages, getNameAndVariantsProperties} from './helper';
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

interface Style {
  id: string;
  key: string;
  name: string;
  description: string;
  remote: boolean;
}

interface Styles {
  fill?: Style;
  stroke?: Style;
  effect?: Style;
  text?: Style;
}

// map node type
const nodeTypeMaps = {
  POLYGON: 'REGULAR_POLYGON',
  PAGE: 'CANVAS'
};

const getStyleInformation = (styleId, convention) => {
  const {id, key, name, description, remote} = figma.getStyleById(styleId);
  return {id, key, name: getConventionName(name, convention), description, remote};
};

const getStyles = (node, convention) => {
  if (!node.fillStyleId && !node.textStyleId && !node.strokeStyleId && !node.effectStyleId) {
    return false;
  }
  const styles: Styles = {};
  node.fillStyleId &&
    typeof node.fillStyleId !== 'symbol' &&
    (styles.fill = getStyleInformation(node.fillStyleId, convention));
  node.textStyleId &&
    typeof node.textStyleId !== 'symbol' &&
    (styles.text = getStyleInformation(node.textStyleId, convention));
  node.strokeStyleId && (styles.stroke = getStyleInformation(node.strokeStyleId, convention));
  node.effectStyleId && (styles.effect = getStyleInformation(node.effectStyleId, convention));
  return styles;
};

const assignProperties = (treeNode, node) => {
  const allowedProperties = [
    'visible',
    'locked',
    'blendMode',
    'size',
    'clipsContent',
    'absoluteTransform',
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

const handleStyle = (treeNode, node, convention) => {
  if (node.fills !== undefined && typeof node.fills !== 'symbol') {
    treeNode.fills = node.fills;
  }
  if (node.strokes !== undefined) {
    treeNode.strokes = node.strokes;
    treeNode.strokeWeight = node.strokeWeight !== undefined ? node.strokeWeight : 1;
    console.log(node.name);
    treeNode.strokeAlign = node.strokeAlign || 'INSIDE';
  }
  const styles = getStyles(node, convention);
  if (styles) {
    treeNode.styles = styles;
  }
};

const handleSpecialNode = (treeNode, node, type, convention) => {
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
    case 'COMPONENT':
      try {
        const {name, variantProperties} = getNameAndVariantsProperties(node);
        treeNode.name = getConventionName(name, convention);
        treeNode.variantProperties = variantProperties;
        treeNode.key = node.key;
        treeNode.description = node.description;
      } catch (err) {
        handleError(node);
        console.log(err);
      }
      break;
    case 'INSTANCE':
      try {
        const {mainComponent} = node;
        const {id, key, description} = mainComponent;
        const {name, variantProperties} = getNameAndVariantsProperties(mainComponent);
        treeNode.variantProperties = variantProperties;
        treeNode.mainComponent = {id, name: getConventionName(name, convention), key, description};
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
    handleSpecialNode(treeNode, node, type, convention);
    handleStyle(treeNode, node, convention);
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
