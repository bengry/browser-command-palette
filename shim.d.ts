import { ProtocolWithReturn } from 'webext-bridge';

declare module 'webext-bridge' {
  /**
   * Define message protocol types
   */
  export interface ProtocolMap {
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'get-current-tab': ProtocolWithReturn<{}, { id: number }>;
    'execute-command': { commandId: string };
  }
}
