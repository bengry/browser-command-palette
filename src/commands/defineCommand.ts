import browser from 'webextension-polyfill';

type Browser = typeof browser;

type HotKey = string;

export interface CommandDefinition {
  id: string;
  displayName: string;
  enabled?: boolean;
  hotKey?: HotKey;
  /**
   * @default 'background'
   */
  executionContext?: 'content-script' | 'background';
  execute(
    browser: Browser,
    sender: {
      tab: { id: number };
    },
  ): void | Promise<void>;
}

export function defineCommand(commandDefinition: CommandDefinition) {
  return commandDefinition;
}
