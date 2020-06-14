import * as React from 'react';
import cn from 'classnames';
import {LangContext} from '@lang/lang-context';

import './header.less';

export interface Props {
  isAllSelected: boolean;
  pageKeys: any[];
  expandedKeys: any[];
  onToggleExpand: (shouldExpand) => void;
  onSelectAllChange: (isChecked) => void;
}

export default class Header extends React.Component<Props> {
  state = {
    isAllSelected: this.props.isAllSelected
  };
  handleSelectAllChange = e => {
    const {onSelectAllChange} = this.props;
    this.setState({
      isAllSelected: e.target.checked
    });
    onSelectAllChange(e.target.checked);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isAllSelected !== this.props.isAllSelected) {
      this.setState({
        isAllSelected: this.props.isAllSelected
      });
    }
  }
  render() {
    const {pageKeys, expandedKeys, onToggleExpand} = this.props;
    const {isAllSelected} = this.state;
    return (
      <LangContext.Consumer>
        {langData => (
          <div className="selector-header">
            <div className="checkbox">
              <input
                id="isAllSelected"
                type="checkbox"
                className="checkbox__box"
                checked={isAllSelected}
                onChange={this.handleSelectAllChange}
              />
              <label className="checkbox__label" htmlFor="isAllSelected">
                {isAllSelected ? langData['deselect all'] : langData['select all']}
              </label>
            </div>
            <div className="stretched-box" />
            <div
              className={cn('header-action header-expand type type--pos-small-normal', {
                'header-action-disabled': expandedKeys.length === pageKeys.length
              })}
              onClick={() => onToggleExpand(true)}
            >
              <span className="header-action-arrow" />
              <span>{langData['expand']}</span>
            </div>
            <div
              className={cn('header-action header-collapse type type--pos-small-normal', {
                'header-action-disabled': expandedKeys.length === 0
              })}
              onClick={() => onToggleExpand(false)}
            >
              <span className="header-action-arrow" />
              <span>{langData['collapse']}</span>
            </div>
          </div>
        )}
      </LangContext.Consumer>
    );
  }
}
