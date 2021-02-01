import {getConventionName} from './helper';
import {FONT_WEIGHTS} from './text';

export const getFillStyle = (style, convention) => ({
  id: style.id,
  key: style.key,
  name: getConventionName(style.name, convention),
  description: style.description,
  styleType: 'FILL',
  items: style.paints
});

export const getTextStyle = (style, convention) => ({
  id: style.id,
  key: style.key,
  name: getConventionName(style.name, convention),
  description: style.description,
  styleType: 'TEXT',
  items: {
    fontSize: style.fontSize,
    fontFamily: style.fontName.family,
    fontWeight: FONT_WEIGHTS[style.fontName.style] || style.fontName.style,
    textDecoration: style.textDecoration,
    letterSpacing: style.letterSpacing.value,
    letterSpacingUnit: style.letterSpacing.unit,
    lineHeight: style.lineHeight.value,
    lineHeightUnit: style.lineHeight.unit
  }
});

export const getEffectStyle = (style, convention) => ({
  id: style.id,
  key: style.key,
  name: getConventionName(style.name, convention),
  description: style.description,
  styleType: 'EFFECT',
  items: style.effects
});

export const getGridStyle = (style, convention) => ({
  id: style.id,
  key: style.key,
  name: getConventionName(style.name, convention),
  description: style.description,
  styleType: 'GRID',
  items: style.layoutGrids
});
