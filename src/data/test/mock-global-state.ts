import { AddToGlobalState } from '../protocols/cache/add-global-state';

export class AddGlobalStateMock implements AddToGlobalState {
  key: string;

  value: any;

  add(key: string, value: any): void {
    this.key = key;
    this.value = [...(this.value || []), value];
  }
}
