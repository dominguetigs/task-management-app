import { searchInObj } from './search-in-obj';
import { searchInString } from './search-in-string';

export function searchInArray<T>(arr: T[], searchText: string): boolean {
  return arr.some(value => {
    if (typeof value === 'string') {
      return searchInString(value, searchText);
    }

    if (typeof value === 'object' && value !== null) {
      return searchInObj(value as Record<string, unknown>, searchText);
    }

    return false;
  });
}
