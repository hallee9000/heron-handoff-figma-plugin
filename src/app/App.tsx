import React, {Fragment} from 'react';
import cn from 'classnames';
import {withGlobalContextProvider} from './context';
import {Loader} from '@components/icons';
import Footer from '@components/Footer';
import Welcome from '@pages/Welcome';
import Selector from '@pages/Selector';
import Settings from '@pages/Settings';
import Support from '@pages/Support';
import {getSelectedPagedFrames, optionsToContents} from '@utils/frames';

import './assets/ds.css';
import './assets/base.less';
import './assets/widgets.less';
import './app.less';

interface Props {
  globalData: any;
  changeGlobalData: (property, value) => void;
  initializeGlobalData: (data) => void;
}

class App extends React.Component<Props> {
  state = {
    type: '',
    message: '',
    isWaiting: true,
    isWelcomed: false,
    supportVisible: false,
    framesData: {}
  };
  changeMessage = (type, message) => {
    this.setState({type, message});
  };
  toggleWaiting = () => {
    const {isWaiting} = this.state;
    this.setState({isWaiting: !isWaiting});
  };
  hideWelcomePanel = () => {
    this.setState({isWelcomed: true});
  };
  toggleSupport = () => {
    const {supportVisible} = this.state;
    this.setState({supportVisible: !supportVisible});
  };
  handleFramesSelected = (allFrames, nestedFrames, checkedKeys) => {
    const pageIds = allFrames.map(({key}) => key);
    this.setState({
      framesData: {
        pagedFrames: getSelectedPagedFrames(allFrames, checkedKeys),
        nestedFrames: optionsToContents(nestedFrames, checkedKeys, true),
        checkedKeys: checkedKeys
          // 过滤掉 page id
          .filter(key => !pageIds.includes(key))
          .filter(key => !key.startsWith('temp-'))
      }
    });
  };
  async componentDidMount() {
    window.onmessage = async event => {
      const {type, message} = event.data.pluginMessage || {};
      this.changeMessage(type, message);
      if (type === 'bg:settings-got') {
        const {settings} = message;
        // if no local settings, store default values
        const {globalData, initializeGlobalData} = this.props;
        if (!settings) {
          const slimGlobalData = {...globalData};
          delete slimGlobalData.view;
          parent.postMessage({pluginMessage: {type: 'ui:set-settings', settings: slimGlobalData}}, '*');
        } else {
          initializeGlobalData({...globalData, ...settings});
        }
      }
    };
  }
  render() {
    const {type, message, isWaiting, isWelcomed, supportVisible, framesData} = this.state;
    return (
      <div className="app">
        {isWaiting && (
          <div className="app-loading">
            <Loader size={60} />
          </div>
        )}
        <div className={cn('app-wrapper', {'app-wrapper-visible': !isWaiting})}>
          {!isWelcomed ? (
            <Welcome
              isWaiting={isWaiting}
              messageData={{type, message}}
              onChecked={this.toggleWaiting}
              onWelcomed={this.hideWelcomePanel}
            />
          ) : (
            <Fragment>
              <Selector messageData={{type, message}} onNext={this.handleFramesSelected} />
              <Settings messageData={{type, message}} framesData={framesData} onFinished={this.toggleSupport} />
              <Support visible={supportVisible} onClose={this.toggleSupport} />
            </Fragment>
          )}
        </div>
        <Footer messageData={{type, message}} isWelcomed={isWelcomed} onSupportClick={this.toggleSupport} />
      </div>
    );
  }
}

export default withGlobalContextProvider(App);
