import {
  SetPersistentStorage,
  GetFromPersistentStorage
} from '@/data/protocols/cache/persistent-storage';

export class PersistentStorageAdapter<T>
  implements GetFromPersistentStorage<T>, SetPersistentStorage<T>
{
  set(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T[] {
    const response = JSON.parse(localStorage.getItem(key)) || [];
    return response;
  }
}
