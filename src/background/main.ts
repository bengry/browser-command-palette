import { onMessage, sendMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';
import { commands as commandsArray } from '@/commands';
import { toObject } from '@/utils';

const commands = toObject(commandsArray, command => command.id);

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

if (__DEV__) {
  browser.runtime.onInstalled.addListener((): void => {
    // eslint-disable-next-line no-console
    console.log('Extension installed');
  });
}

browser.commands.onCommand.addListener(async command => {
  if (command !== 'show-palette') {
    // eslint-disable-next-line no-console
    console.warn(`Unknown command "${command}"`);
    return;
  }

  const [activeTab] = await browser.tabs.query({ active: true });

  sendMessage('show-palette', null, {
    tabId: activeTab.id!,
    context: 'content-script',
  });
});

onMessage('execute-command', ({ data, sender }) => {
  const command = commands[data.commandId];
  if (!command) {
    throw new Error(`Unknown command id (${data.commandId}).`);
  }

  return command.execute(browser, {
    tab: { id: sender.tabId },
  });
});

onMessage('get-current-tab', ({ sender }) => ({
  id: sender.tabId,
}));
