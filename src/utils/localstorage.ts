export function setToLocalstorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalstorage<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedItem = localStorage.getItem(key);

  if (!storedItem) {
    return null;
  }

  return JSON.parse(storedItem);
}
