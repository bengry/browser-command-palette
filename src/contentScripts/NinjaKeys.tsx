import '@webcomponents/webcomponentsjs';
import 'ninja-keys';

import type { NinjaKeys } from 'ninja-keys';
import { useCallback, useEffect, useRef } from 'preact/hooks';

interface NinjaKeysAttributes {
  placeholder?: string;
  disableHotkeys?: boolean;
  hideBreadcrumbs?: boolean;
  openHotkey?: string;
  navigationUpHotkey?: string;
  navigationDownHotkey?: string;
  closeHotkey?: string;
  goBackHotkey?: string;
  selectHotkey?: string;
  hotKeysJoinedView?: boolean;
  noAutoLoadMdIcons?: boolean;
}
export function useNinjaKeys({ commands: data }: { commands: NinjaKeys['data'] }) {
  const ninjaKeys = useRef<NinjaKeys>(null);

  useEffect(() => {
    if (!ninjaKeys.current) {
      return;
    }

    ninjaKeys.current.data = data;
  }, []);

  /**
   * Helper function to not have to deal with the ref maybe being `null` everywhere.
   */
  const executeOnInstance = useCallback((execute: (instance: NinjaKeys) => unknown) => {
    if (ninjaKeys.current) {
      execute(ninjaKeys.current);
    }
  }, []);

  const Component = useCallback((attributes: NinjaKeysAttributes) => {
    /* @ts-expect-error -- Preact TypeScript definitions don't like custom elements */
    return <ninja-keys {...attributes} ref={ninjaKeys}></ninja-keys>;
  }, []);

  return {
    $ref: ninjaKeys,
    NinjaKeys: Component,
    toggle: useCallback(() => {
      executeOnInstance(instance => (instance.visible ? instance.close() : instance.open()));
    }, []),
  };
}
