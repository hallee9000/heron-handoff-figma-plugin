import {sendMessage} from './helper';

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getUserId = async () => {
  let userId = create_UUID();

  try {
    const id = await figma.clientStorage.getAsync('userId');

    if (typeof id === 'undefined') {
      figma.clientStorage.setAsync('userId', userId).then(() => {
        sendMessage({
          type: 'bg:mixpanel-user',
          message: {userId}
        });
      });
    } else {
      userId = id;
      sendMessage({
        type: 'bg:mixpanel-user',
        message: {userId}
      });
    }
  } catch (e) {
    console.error('userId retrieving error', e);
    figma.clientStorage.setAsync('userId', userId).then(() => {
      sendMessage({
        type: 'bg:mixpanel-user',
        message: {userId}
      });
    });
  }
};
