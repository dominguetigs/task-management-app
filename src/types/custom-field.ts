import { IconNames } from './icon-names';

export type CustomFieldTypes = 'text' | 'number' | 'boolean';

export type CustomField = {
  id: string;
  name: string;
  type: CustomFieldTypes;
  canInteract: boolean;
  icon?: IconNames;
};
