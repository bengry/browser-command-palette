import { defineCommand } from '../defineCommand';

export default defineCommand({
  id: 'tab.duplicate',
  displayName: 'Duplicate Tab',
  async execute(browser, sender) {
    await browser.tabs.duplicate(sender.tab.id);
  },
});
