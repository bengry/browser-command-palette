/* eslint-disable no-console */
import { render } from 'preact';
import { sendMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';
import { App } from './App';

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(async () => {
  console.info('[BCP] Loaded content script');
  const currentTabPromise = sendMessage('get-current-tab', {}, 'background');

  // mount component to context window
  const container = document.createElement('browser-command-palette');
  const root = document.createElement('div');
  const styleEl = document.createElement('link');
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container;
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'));
  shadowDOM.appendChild(styleEl);
  shadowDOM.appendChild(root);
  document.body.appendChild(container);

  const tab = await currentTabPromise;

  render(<App tab={tab} />, root, root);
})();
