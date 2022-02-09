import { defineCommand } from '../defineCommand';

export default defineCommand({
  enabled: __DEV__,
  id: 'debug.alert',
  displayName: 'Debug Alert',
  executionContext: 'content-script',
  async execute(browser) {
    alert('Debug message');
  },
});
