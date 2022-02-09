import { CommandDefinition } from './defineCommand';

export const commands = Object.entries(import.meta.globEager('./definitions/**/*.ts'))
  .map(([key, value]) => value as CommandDefinition | { default: CommandDefinition })
  .map(moduleDefinition => ('default' in moduleDefinition ? moduleDefinition.default : moduleDefinition))
  .map(commandDefinition => ({ ...commandDefault, ...commandDefinition }))
  .filter(command => command.enabled);

const commandDefault = {
  enabled: true,
  executionContext: 'background',
} as const;
