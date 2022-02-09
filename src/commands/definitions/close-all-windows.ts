import { isNonNullable } from '@/utils';
import { defineCommand } from '../defineCommand';

export default defineCommand({
  id: 'windows.close-all',
  displayName: 'Close all Windows',
  async execute(browser) {
    const windows = await browser.windows.getAll({ windowTypes: ['normal', 'popup'] });

    Promise.all(
      windows
        .map(window => window.id)
        .filter(isNonNullable)
        .map(windowId => browser.windows.remove(windowId)),
    );
  },
});
