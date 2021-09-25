// 递归获取所有的 key
export const getKeys = options => {
  const allKeys = [];
  const folderKeys = [];
  function walk(items) {
    items.map(({key, children}) => {
      allKeys.push(key);
      if (children) {
        folderKeys.push(key);
        walk(children);
      }
    });
  }
  walk(options);
  return {allKeys, folderKeys};
};

export const getSelectedKeys = pagesAndFrames => {
  return pagesAndFrames.map(({children}) => children.map(({id}) => id)).reduce((a, b) => a.concat(b));
};

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

export function compare(a, b) {
  const nameA = a.title.toUpperCase(),
    nameB = b.title.toUpperCase();
  const [numA] = a.title.match(/^[0-9]+/g) || [];
  const [numB] = b.title.match(/^[0-9]+/g) || [];
  if (numA && numB) {
    return numA - numB;
  }
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export const getSortedAllFrames = allFrames => {
  if (allFrames.length === 0) {
    return [];
  }
  const clonedAllFrames = [...allFrames];
  const alphabetFrames = clonedAllFrames.sort(compare).map(({children, ...rest}) => ({
    children: [...children].sort(compare),
    ...rest
  }));
  const reversedAlphabetFrames = [...alphabetFrames].reverse().map(({children, ...rest}) => ({
    children: [...children].reverse(),
    ...rest
  }));
  return [clonedAllFrames, alphabetFrames, reversedAlphabetFrames];
};

export const getNestedPageFrames = allFrames => {
  const getTitleParts = fullTitle =>
    fullTitle
      .split('/')
      .map(e => e.trim())
      .filter(part => !!part);

  function walk(frames, pageIndex) {
    const nestedFrames = [];
    // 逐个处理 frame
    frames.map((frame, frameIndex) => {
      let tempFrames = nestedFrames;
      // 名字由斜线分开后的多个块
      const titleParts = getTitleParts(frame.title);
      // 逐个处理名字的每一块
      titleParts.forEach((_n, index) => {
        const currentTitle = titleParts.slice(0, index + 1).join('/');
        let matchedFrame = tempFrames.find(t => t.title === currentTitle);
        // 最后一个
        if (index === titleParts.length - 1) {
          // 如果出现同名的，但是没有 key(id)，就把这个作为它的母页面
          if (matchedFrame && matchedFrame.key.startsWith('temp-')) {
            matchedFrame.key = frame.key;
          } else {
            tempFrames.push({
              key: frame.key,
              title: currentTitle
            });
          }
        } else {
          // 这一层没找到
          if (!matchedFrame) {
            const s = {
              key: `temp-${pageIndex}-${frameIndex}-${index}`,
              title: currentTitle,
              children: []
            };
            tempFrames.push(s);
            matchedFrame = s;
          }
          // 循环下一次进入下一层
          if (!matchedFrame.children) {
            matchedFrame.children = [];
          }
          tempFrames = matchedFrame.children;
        }
      });
    });
    return nestedFrames;
  }

  // page 不需要分了，直接循环拆分内部的 frame
  return allFrames.map((page, pageIndex) => {
    return {...page, children: walk(page.children, pageIndex)};
  });
};
