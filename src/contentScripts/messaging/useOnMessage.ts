import { onMessage } from 'webext-bridge';

export function useOnMessage(...args: Parameters<typeof onMessage>) {
  onMessage(...args);
}
