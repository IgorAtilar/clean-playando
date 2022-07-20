import { GetFromPersistentStorage } from '@/data/protocols/cache/get-from-persistent-storage';
import { SetPersistentStorage } from '@/data/protocols/cache/set-persistent-storage';

export class PersistentStorageAdapter implements GetFromPersistentStorage, SetPersistentStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any[] {
    const response = JSON.parse(localStorage.getItem(key)) || [];

    return response;
  }
}
