import { searchInArray } from './search-in-array';
import { searchInString } from './search-in-string';

export function searchInObj<T extends Record<string, unknown>>(
  obj: T,
  searchText: string,
): boolean {
  return Object.values(obj).some(value => {
    if (typeof value === 'string') {
      return searchInString(value, searchText);
    }

    if (Array.isArray(value)) {
      return searchInArray(value, searchText);
    }

    if (typeof value === 'object' && value !== null) {
      return searchInObj(value as Record<string, unknown>, searchText);
    }

    return false;
  });
}
