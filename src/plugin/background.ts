import {sendMessage} from '@utils/helper';

export async function initial() {
  figma.currentPage.setRelaunchData({open: 'Run Heron handoff'});
  const isWelcomed = await figma.clientStorage.getAsync('welcomed');
  sendMessage({
    type: 'bg:check-welcome',
    message: {isWelcomed}
  });

  const settings = await figma.clientStorage.getAsync('heronHandoff.settings');
  sendMessage({
    type: 'bg:settings-got',
    message: {settings}
  });
}

export function getSelectedArtboards() {
  return figma.root.children
    .map(page => ({
      id: page.id,
      name: page.name,
      children: page.selection
        .filter(sel => sel.type === 'FRAME' && sel.parent.type === 'PAGE')
        .map(({id, name}) => ({id, name}))
    }))
    .filter(page => page.children.length);
}

export function listenToChange() {
  function getOrder() {
    const shouldResponse = figma.root.getPluginData('should-response');
    figma.root.setPluginData('should-response', 'yes');
    return shouldResponse;
  }
  figma.on('currentpagechange', function() {
    if (getOrder() === 'no') {
      return;
    }
    sendMessage({
      type: 'bg:current-page-change',
      message: {
        currentPageId: figma.currentPage.id
      }
    });
  });
  figma.on('selectionchange', function() {
    if (getOrder() === 'no') {
      return;
    }
    sendMessage({
      type: 'bg:selection-change',
      message: {
        selectedFrames: getSelectedArtboards()
      }
    });
  });
}
