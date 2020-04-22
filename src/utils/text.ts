export const FONT_WEIGHTS = {
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
  '600': 'semibold', // that's not right but /shrug
  Bold: 'bold',
  '700': 'bold',
  Extrabold: 'heavy',
  Ultrabold: 'heavy',
  Heavy: 'heavy',
  '800': 'heavy',
  Black: 'black',
  '900': 'bacl'
};

export const compareStyles = (style1, style2) => {
  // Create arrays of property names
  const props1 = Object.getOwnPropertyNames(style1);
  const props2 = Object.getOwnPropertyNames(style2);

  // If number of properties is different,
  // styles are not equivalent
  if (props1.length !== props2.length) return false;
  //Loop through properties in object 1
  for (const p in style1) {
    //Check property exists on both objects
    if (style1.hasOwnProperty(p) !== style2.hasOwnProperty(p)) return false;

    switch (typeof style1[p]) {
      //Deep compare objects
      case 'object':
        if (!compareStyles(style1[p], style2[p])) return false;
        break;
      //Compare values
      default:
        if (style1[p] !== style2[p]) return false;
    }
  }

  return true;
};

export const hasSymbolProperties = textNode => {
  const {fontName, fontSize, lineHeight, textDecoration, letterSpacing, fills} = textNode;
  return !![fontName, fontSize, lineHeight, textDecoration, letterSpacing, fills].filter(arg => typeof arg === 'symbol')
    .length;
};

export const hasEqualProperties = (style, anotherStyle) => {
  if (
    style.fillStyleId &&
    anotherStyle.fillStyleId &&
    style.textStyleId &&
    anotherStyle.textStyleId &&
    style.fillStyleId === anotherStyle.fillStyleId &&
    style.textStyleId === anotherStyle.textStyleId
  ) {
    return true;
  } else if (
    // all ids are ''
    !style.fillStyleId &&
    !anotherStyle.fillStyleId &&
    !style.textStyleId &&
    !anotherStyle.textStyleId
  ) {
    const isTheSame = compareStyles(style, anotherStyle);
    return isTheSame;
  } else {
    return false;
  }
};

export const getTrimedStyleId = styleId => {
  const isSymbol = typeof styleId === 'symbol';
  return isSymbol ? '' : styleId;
};

export const getSingleTextStyle = (textNode, index?) => {
  const fillStyleId =
    index === undefined ? getTrimedStyleId(textNode.fillStyleId) : textNode.getRangeFillStyleId(index, index + 1);
  const textStyleId =
    index === undefined ? getTrimedStyleId(textNode.textStyleId) : textNode.getRangeTextStyleId(index, index + 1);
  const fontSize = index === undefined ? textNode.fontSize : textNode.getRangeFontSize(index, index + 1);
  const fontName = index === undefined ? textNode.fontName : textNode.getRangeFontName(index, index + 1);
  const textDecoration =
    index === undefined ? textNode.textDecoration : textNode.getRangeTextDecoration(index, index + 1);
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
    textAlignVertical: textNode.textAlignVertical
  };
};

// return style object while single style;
// return textTable array while mixed style;
export const getTextNodeStyle = textNode => {
  // mixed text style
  if (hasSymbolProperties(textNode)) {
    const textTable = [];
    let currentTextStyle;
    Array.prototype.map.call(textNode.characters, (character, index) => {
      // first, just store it
      if (index === 0) {
        currentTextStyle = getSingleTextStyle(textNode, index);
        textTable.push({text: character, ...currentTextStyle});
      } else {
        const lastestTextStyle = getSingleTextStyle(textNode, index);
        const textTableLength = textTable.length;
        // equal to previous one
        if (hasEqualProperties(currentTextStyle, lastestTextStyle)) {
          textTable[textTableLength - 1].text += character;
        } else {
          textTable.push({text: character, ...lastestTextStyle});
        }
        currentTextStyle = lastestTextStyle;
      }
    });
    return textTable;
  } else {
    return getSingleTextStyle(textNode);
  }
};
