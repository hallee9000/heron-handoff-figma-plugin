// main.ts
import * as mixpanel from 'mixpanel-figma';
import {MIXPANEL_KEY} from '../keys';

// disabling via config just in case
mixpanel.init(MIXPANEL_KEY, {
  disable_cookie: true,
  disable_persistence: true
});

export default mixpanel;
