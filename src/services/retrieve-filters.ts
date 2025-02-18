import { Filter } from '@/types';
import { getFromLocalstorage, setToLocalstorage } from '@/utils';

export function retrieveFilters(): Filter[] {
  const storedFilters = getFromLocalstorage<Filter[]>('filters');

  if (!storedFilters) {
    setToLocalstorage('filters', []);
    return [];
  }

  return storedFilters;
}
