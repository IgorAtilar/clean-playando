import { AddToGlobalState } from '../protocols/cache/add-global-state';
import { GetGlobalState } from '../protocols/cache/get-global-state';

export class AddGlobalStateMock implements AddToGlobalState {
  key: string;

  value: any;

  add(key: string, value: any): void {
    this.key = key;
    this.value = [...(this.value || []), value];
  }
}

export class GetGlobalStateMock implements GetGlobalState {
  key: string;

  get(key: string) {
    this.key = key;
    return [];
  }
}
