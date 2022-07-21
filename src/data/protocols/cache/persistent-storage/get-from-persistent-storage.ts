export interface GetFromPersistentStorage<T> {
  get(key: string): T[];
}
