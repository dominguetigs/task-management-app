import { CustomFieldTypes } from '@/types';

export function getDefaultValueByFieldType(type: CustomFieldTypes) {
  if (type === 'text') {
    return '';
  }

  if (type === 'number') {
    return 0;
  }

  if (type === 'boolean') {
    return true;
  }

  return null;
}
