import React, {createContext, useContext, useState} from 'react';
import langs from '@lang/index';

export interface IGlobalContext {
  globalData: {
    view: string;
    language: string;
    platform: number;
    resolution: number;
    unit: number;
    remBase: number;
    convention: number;
    includeComponents: boolean;
    imagesConvention: number;
    overrideRepeatedImages: boolean;
    exportWebP: boolean;
  };
  changeGlobalData: (property: string | any, value?: any) => void;
}

const defaultGlobalContext: IGlobalContext = {
  globalData: {
    view: 'selector',
    language: 'zh',
    platform: 0,
    resolution: 0,
    unit: 2,
    remBase: 16,
    convention: 1,
    includeComponents: false,
    imagesConvention: 1,
    overrideRepeatedImages: true,
    exportWebP: false
  },
  changeGlobalData: () => {}
};

const GlobalContext = createContext(defaultGlobalContext);

export const withGlobalContextProvider = Component => {
  return props => {
    const [globalData, setGlobalData] = useState(defaultGlobalContext.globalData);
    const handleChangeGlobalData = (property, value) => {
      let changedSettings;
      if (value === undefined) {
        changedSettings = property;
      } else {
        changedSettings = {[property]: value};
      }
      const newGlobalData = {...globalData, ...changedSettings};
      setGlobalData(newGlobalData);
    };
    const initializeGlobalData = data => {
      setGlobalData(data);
    };
    return (
      <GlobalContext.Provider value={{globalData, changeGlobalData: handleChangeGlobalData}}>
        <Component
          {...props}
          globalData={globalData}
          changeGlobalData={handleChangeGlobalData}
          initializeGlobalData={initializeGlobalData}
        />
      </GlobalContext.Provider>
    );
  };
};

export const withGlobalContextConsumer = Component => {
  return props => {
    const {globalData, changeGlobalData} = useContext(GlobalContext);
    return <Component {...props} globalData={globalData} changeGlobalData={changeGlobalData} />;
  };
};

export const withTranslation = (Component, scope = 'common') => {
  return props => {
    const {globalData} = useContext(GlobalContext);
    const {language} = globalData;
    const t = key => langs[scope][language][key];
    return <Component {...props} t={t} />;
  };
};

export default GlobalContext;
