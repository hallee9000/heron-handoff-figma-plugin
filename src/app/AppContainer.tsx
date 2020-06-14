import React, {Fragment} from 'react';
import cn from 'classnames';
import {LangContext, langs} from '@lang/lang-context';
import {Loader} from '@components/icons';
import Footer from '@components/Footer';
import Welcome from '@pages/Welcome';
import Selector from '@pages/Selector';
import ExportSettings from '@pages/ExportSettings';
import Support from '@pages/Support';

import './assets/ds.css';
import './assets/base.less';
import './assets/widgets.less';
import './app.less';

export default class App extends React.Component {
  state = {
    type: '',
    message: '',
    isWaiting: true,
    isWelcomed: false,
    supportVisible: false,
    langData: langs.zh
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
  handleLangChange = lang => {
    this.setState({
      langData: langs[lang]
    });
  };
  toggleSupport = () => {
    const {supportVisible} = this.state;
    this.setState({supportVisible: !supportVisible});
  };
  async componentDidMount() {
    window.onmessage = async event => {
      const {type, message} = event.data.pluginMessage || {};
      this.changeMessage(type, message);
    };
  }
  render() {
    const {type, message, isWaiting, isWelcomed, langData, supportVisible} = this.state;
    return (
      <LangContext.Provider value={langData}>
        <div className="app">
          {isWaiting && (
            <div className="app-loading">
              <Loader size={60} />
            </div>
          )}
          <div className={cn('app-wrapper', {'app-wrapper-visible': !isWaiting})}>
            {!isWelcomed ? (
              <Welcome
                messageData={{type, message}}
                onChecked={this.toggleWaiting}
                onWelcomed={this.hideWelcomePanel}
              />
            ) : (
              <Fragment>
                <Selector messageData={{type, message}} />
                <ExportSettings messageData={{type, message}} onSecceed={this.toggleSupport} />
                <Support visible={supportVisible} onClose={this.toggleSupport} />
              </Fragment>
            )}
          </div>
          <Footer
            messageData={{type, message}}
            onLangChange={this.handleLangChange}
            onSupportClick={this.toggleSupport}
          />
        </div>
      </LangContext.Provider>
    );
  }
}
