import '../styles';

import { ComponentChildren } from 'preact';
import { forwardRef } from 'preact/compat';
import { useRef } from 'preact/hooks';
import { sendMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';
import { commands } from '../commands';
import { useOnMessage } from './messaging/useOnMessage';
import { useNinjaKeys } from './NinjaKeys';

interface Props {
  tab: { id: number };
}

export function App({ tab }: Props) {
  const root = useRef<HTMLDivElement>(null);

  const { NinjaKeys, ...ninjaKeys } = useNinjaKeys({
    commands: commands.map(command => ({
      id: command.displayName,
      title: command.displayName,
      handler() {
        if (command.executionContext === 'content-script') {
          return command.execute(browser, { tab });
        } else {
          return sendMessage('execute-command', { commandId: command.id });
        }
      },
    })),
  });

  useOnMessage('show-palette', () => {
    ninjaKeys.toggle();
  });

  return (
    <Container ref={root}>
      <NinjaKeys hideBreadcrumbs openHotkey={noopHotKey} />
    </Container>
  );
}

const Container = forwardRef<HTMLDivElement, { children: ComponentChildren }>(({ children, ...props }, ref) => (
  <div dir="ltr" className="fixed top-1/2 left-1/2" {...props} ref={ref}>
    {children}
  </div>
));

const noopHotKey = '';
