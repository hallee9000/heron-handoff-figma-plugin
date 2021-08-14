export const PLATFORMS = ['Web', 'iOS', 'Android'];

export const WEB_MULTIPLE = [
  {
    label: '1x',
    value: 1
  },
  {
    label: '2x',
    value: 2
  },
  {
    label: '3x',
    value: 3
  }
];

export const IOS_DENSITY = [
  {
    label: '@1x',
    value: 1
  },
  {
    label: '@2x',
    value: 1 / 2
  },
  {
    label: '@3x',
    value: 1 / 3
  }
];

export const ANDROID_DENSITY = [
  {
    label: 'ldpi (4/3)',
    value: 4 / 3
  },
  {
    label: 'mdpi',
    value: 1
  },
  {
    label: 'tvdpi (3/4)',
    value: 3 / 4
  },
  {
    label: 'hdpi (2/3)',
    value: 2 / 3
  },
  {
    label: 'xhdpi (1/2)',
    value: 1 / 2
  },
  {
    label: 'xxhdpi (1/3)',
    value: 1 / 3
  },
  {
    label: 'xxxhdpi (1/4)',
    value: 1 / 4
  }
];

export const UNITS = ['pt', 'dp', 'px', 'em', 'rem', 'rpx'];

export const NAMING_CONVENTION = ['original', 'underscore', 'dash', 'upper camel case', 'lower camel case'];

export const CONVENTION_LIBRARY_EXAMPLES = [
  ' (blue/primary)',
  ' (blue_primary)',
  ' (blue-primary)',
  ' (bluePrimary)',
  ' (BluePrimary)'
];

export const CONVENTION_IMAGES_EXAMPLES = [
  ' (icon/home)',
  ' (icon_home)',
  ' (icon-home)',
  ' (iconHome)',
  ' (IconHome)'
];

export const SORT_ORDERS = ['original order', 'alphabet order', 'alphabet reversed order'];
