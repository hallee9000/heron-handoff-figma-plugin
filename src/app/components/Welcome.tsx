import * as React from 'react';
import cn from 'classnames';

import './welcome.less';

export interface Props {
  visible: boolean;
  onStart: () => void;
}

export default ({visible, onStart}) => (
  <div className={cn('welcome', {hide: !visible})}>
    <img src="https://figmacn.com/handoff/welcome.png" />
    <h2 className="type type--pos-xlarge-bold">Juuust Handoff</h2>
    <div className="welcome-introduction type type--pos-small-normal">
      This plugin can help you export developer handoff files with design specs.{' '}
      <a href="https://figmacn.com/handoff-landing" target="_blank">
        Learn more
      </a>
    </div>
    <div className="welcome-introduction type type--pos-small-normal">
      这是一个可以帮助你生成设计标注文件的插件，方便交付给开发。{' '}
      <a href="https://figmacn.com/handoff-landing" target="_blank">
        了解更多
      </a>
    </div>
    <button className="button button--primary" onClick={onStart}>
      Next Step
    </button>
  </div>
);
