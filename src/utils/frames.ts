export const getFlattenedFrameKeys = (pagedFrames, checkedKeys?) => {
  const frameKeys = [];
  pagedFrames.map(({children}) => {
    children
      .filter(({key}) => (checkedKeys ? checkedKeys.indexOf(key) > -1 : true))
      .map(({key}) => {
        frameKeys.push(key);
      });
  });
  return frameKeys;
};

export const getSelectedPagedFrames = (frames, checkedKeys) => {
  const pagedFrames = {};
  frames.map(({key, title, children}) => {
    const selectedFrames = children.filter(({key}) => checkedKeys.indexOf(key) > -1);
    if (selectedFrames.length) {
      pagedFrames[key] = {
        name: title,
        frames: selectedFrames.map(({key, title}) => ({
          id: key,
          name: title
        }))
      };
    }
  });
  return pagedFrames;
};

export const getPageKeys = frames => {
  const pageKeys = frames.map(({key}) => key);
  return pageKeys;
};

export const getAllPagedFrames = document =>
  document.children
    .map(page => ({
      key: page.id,
      title: page.name,
      children: page.children
        .filter(({type, visible}) => type === 'FRAME' && visible)
        .map(frame => ({
          key: frame.id,
          title: frame.name
        }))
        .reverse()
    }))
    .filter(page => !!page.children.length);

export const getCurrentPageFrameKeys = currentPage =>
  currentPage.children.filter(({type, visible}) => type === 'FRAME' && visible).map(frame => frame.id);

export const getSelectedFrameKeys = currentPage =>
  currentPage.selection
    .filter(({parent, type, visible}) => parent.type === 'PAGE' && type === 'FRAME' && visible)
    .map(frame => frame.id);
