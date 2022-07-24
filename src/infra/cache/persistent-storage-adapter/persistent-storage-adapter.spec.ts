import { faker } from '@faker-js/faker';
import { PersistentStorageAdapter } from './persistent-storage-adapter';

jest.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = jest.fn();
jest.spyOn(Storage.prototype, 'getItem');
Storage.prototype.setItem = jest.fn();

describe('Infra: PersistentStorageAdapter', () => {
  it('should call localStorage setItem with the correct values when set method is called', () => {
    const key = faker.datatype.string();
    const value = faker.datatype.array();
    const persistentStorage = new PersistentStorageAdapter();
    persistentStorage.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should call localStorage getItem with the correct values when get method is called', () => {
    const key = faker.datatype.string();
    const persistentStorage = new PersistentStorageAdapter();
    persistentStorage.get(key);

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });
});
