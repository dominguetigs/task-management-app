export function setToLocalstorage<T>(key: string, value: T): void | null {
  if (typeof window === 'undefined') {
    return null;
  }

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

export function updateLocalStorage<T>(key: string, data: T): T {
  setToLocalstorage(key, data);
  return data;
}
