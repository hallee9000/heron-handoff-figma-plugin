import {sendMessage} from '@utils/helper';

export default async function() {
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
