export function setToLocalstorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalstorage<T>(key: string): T | null {
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
