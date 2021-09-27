import React from 'react';
import {Sider, FileText, Folder} from './icons';

const TreeNodeIcon = function({data}) {
  const isFolder = data.key.startsWith('temp-');
  return data.isPage ? <Sider /> : isFolder ? <Folder /> : <FileText />;
};

export default TreeNodeIcon;
