/* eslint-disable no-console */

import { render } from 'preact';
import { onMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';
import { App } from './App';

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[BCP] Loaded content script');

  // mount component to context window
  const container = document.createElement('div');
  const root = document.createElement('div');
  // // root.hidden = true;
  const styleEl = document.createElement('link');
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container;
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'));
  shadowDOM.appendChild(styleEl);
  shadowDOM.appendChild(root);
  document.body.appendChild(container);
  render(<App />, root);

  onMessage('activate', message => {
    console.log('Got request to activate', message);

    root.hidden = !root.hidden;
  });
})();
