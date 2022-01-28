import { sendMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';

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
  if (command !== 'activate') {
    // eslint-disable-next-line no-console
    console.warn(`Unknown command "${command}"`);
    return;
  }

  const [activeTab] = await browser.tabs.query({ active: true });

  sendMessage('activate', null, {
    tabId: activeTab.id!,
    context: 'content-script',
  });
});
