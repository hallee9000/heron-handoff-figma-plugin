import * as React from 'react';
import Tree from 'rc-tree';
import cn from 'classnames';
import Support from './Support';
import {Docs, Coffee} from './icons';
import {getFlattenedFrameKeys, getSelectedPagedFrames, getPageKeys} from '../../utils/frames';

import './selector.less';

export interface Props {
    allFrames: any[];
    currentFrames: string[];
    currentPageKey: string;
    visible: boolean;
    percentage: number;
    buttonText: string;
    onStart: (data) => void;
}

export default class Selector extends React.Component<Props> {
    allPageKeys = getPageKeys(this.props.allFrames);
    allFrameKeys = getFlattenedFrameKeys(this.props.allFrames);
    state = {
        checkedKeys: this.props.currentFrames,
        allPageKeys: this.allPageKeys,
        expandedKeys: [this.props.currentPageKey],
        selectAll: false,
        includeComponents: false,
        useHDImages: true,
        supportVisible: false,
    };
    handleCheckboxChange = e => {
        this.setState({
            [e.target.id]: e.target.checked,
        });
        if (e.target.id === 'selectAll') {
            this.setState({
                checkedKeys: e.target.checked ? this.allFrameKeys : [],
            });
        }
    };
    handleCheck = checkedKeys => {
        this.setState({
            checkedKeys,
            selectAll: checkedKeys.length === this.allFrameKeys.length + this.allPageKeys.length,
        });
    };
    handleExpand = expandedKeys => {
        this.setState({expandedKeys});
    };
    toggleExpandAll = shouldExpand => {
        const {allPageKeys} = this.state;
        this.setState({
            expandedKeys: shouldExpand ? allPageKeys : [],
        });
    };
    handleStart = () => {
        const {allFrames} = this.props;
        const {checkedKeys, includeComponents, useHDImages} = this.state;
        const pagedFrames = getSelectedPagedFrames(allFrames, checkedKeys);
        const selectedFrameKeys = getFlattenedFrameKeys(allFrames, checkedKeys);
        this.props.onStart({pagedFrames, selectedFrameKeys, includeComponents, useHDImages});
    };
    toggleSupport = () => {
        const {supportVisible} = this.state;
        this.setState({supportVisible: !supportVisible});
    };
    render() {
        const {visible, allFrames, percentage, buttonText} = this.props;
        const {
            checkedKeys,
            expandedKeys,
            allPageKeys,
            selectAll,
            includeComponents,
            useHDImages,
            supportVisible,
        } = this.state;
        return (
            <div className={cn('selector', {hide: !visible})}>
                <div className="selector-header">
                    <div
                        className={cn('header-action header-expand type type--pos-small-normal', {
                            'header-action-disabled': expandedKeys.length === allPageKeys.length,
                        })}
                        onClick={() => this.toggleExpandAll(true)}
                    >
                        <span className="header-action-arrow" />
                        <span>Expand all</span>
                    </div>
                    <div
                        className={cn('header-action header-collapse type type--pos-small-normal', {
                            'header-action-disabled': expandedKeys.length === 0,
                        })}
                        onClick={() => this.toggleExpandAll(false)}
                    >
                        <span className="header-action-arrow" />
                        <span>Collapse all</span>
                    </div>
                    <div className="stretched-box" />
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="selectAll"
                            className="checkbox__box"
                            checked={selectAll}
                            onChange={this.handleCheckboxChange}
                        />
                        <label className="checkbox__label" htmlFor="selectAll">
                            {selectAll ? 'Deselect all' : 'Select all'}
                        </label>
                    </div>
                </div>
                <div className="selector-tree">
                    <Tree
                        checkable
                        selectable={false}
                        checkedKeys={checkedKeys}
                        expandedKeys={expandedKeys}
                        onExpand={this.handleExpand}
                        showIcon={false}
                        treeData={allFrames}
                        onCheck={this.handleCheck}
                    />
                </div>
                <div className="selector-actions">
                    {!checkedKeys.length && (
                        <div className="actions-error type type--pos-small-bold">Please select at least one Frame.</div>
                    )}
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="includeComponents"
                            className="checkbox__box"
                            checked={includeComponents}
                            onChange={this.handleCheckboxChange}
                        />
                        <label className="checkbox__label" htmlFor="includeComponents">
                            Export components separately
                        </label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="useHDImages"
                            className="checkbox__box"
                            checked={useHDImages}
                            onChange={this.handleCheckboxChange}
                        />
                        <label className="checkbox__label" htmlFor="useHDImages">
                            Use high-quality images
                        </label>
                    </div>
                    <button
                        className="button button--primary"
                        disabled={(percentage > 0 && percentage < 100) || !checkedKeys.length}
                        onClick={this.handleStart}
                    >
                        <div style={{width: `${percentage}%`}} />
                        <span>{buttonText}</span>
                    </button>
                    <div className="actions-extra">
                        <a href="https://github.com/leadream/figma-handoff#plugin" target="_blank" title="Docs">
                            <Docs />
                        </a>
                        <span onClick={this.toggleSupport} title="Buy me a coffee">
                            <Coffee />
                        </span>
                    </div>
                </div>
                <Support visible={supportVisible} onClose={this.toggleSupport} />
            </div>
        );
    }
}
