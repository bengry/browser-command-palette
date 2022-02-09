import { isNonNullable } from '@/utils';
import { defineCommand } from '../defineCommand';

export default defineCommand({
  id: 'window.close-other-tabs',
  displayName: 'Close Other Tabs in Window',
  async execute(browser, sender) {
    const senderWindowId = await browser.tabs.get(sender.tab.id).then(tab => tab.windowId!);
    const senderWindow = await browser.windows.get(senderWindowId, { populate: true });

    const otherTabsInWindow = (senderWindow.tabs ?? []).filter(tab => tab.id !== sender.tab.id);

    await browser.tabs.remove(otherTabsInWindow.map(tab => tab.id).filter(isNonNullable));
  },
});
