import { Video } from '@/domain/models/video-model';
import {
  GetFromPersistentStorage,
  SetPersistentStorage
} from '../protocols/cache/persistent-storage';

export type PersistentStorageMockStorage<T> = Record<string, T[]>;

export class PersistentStorageMock<T>
  implements GetFromPersistentStorage<T>, SetPersistentStorage<T>
{
  storage: PersistentStorageMockStorage<T> = {};

  get(key: string): T[] {
    return this.storage[key] || [];
  }

  set(key: string, value: T[]): void {
    this.storage[key] = value;
  }
}
