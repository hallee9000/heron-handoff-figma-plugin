import React from 'react';
import {File, FileText, Folder} from './icons';

const TreeNodeIcon = function({data}) {
  const isFolder = data.key.startsWith('temp-');
  const isLeaf = !data.children;
  return isLeaf ? <File /> : isFolder ? <Folder /> : <FileText />;
};

export default TreeNodeIcon;
