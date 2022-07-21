export interface SetPersistentStorage<T> {
  set(key: string, value: T[]): void;
}
