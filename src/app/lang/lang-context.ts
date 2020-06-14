import React from 'react';
import langData from './lang.json';

export const LangContext = React.createContext(langData.zh);

export const langs = langData;
