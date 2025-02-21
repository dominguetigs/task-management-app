import { searchInObj } from './search-in-obj';

export function filterArrayByString<T extends Record<string, unknown>>(
  arr: T[],
  searchText: string,
): T[] {
  if (!searchText.trim()) {
    return arr;
  }

  searchText = searchText.toLowerCase();

  return arr.filter(itemObj => searchInObj(itemObj, searchText));
}
