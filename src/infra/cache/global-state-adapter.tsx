/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { AddToGlobalState } from '@/data/protocols/cache/add-global-state';
import { GetGlobalState } from '@/data/protocols/cache/get-global-state';

type GlobalState = Record<string, any[]>;

type GlobalStateData = {
  addToGlobalState(key: string, value: any): void;
  globalState: GlobalState;
};

type GlobalStateProps = PropsWithChildren;

export const GlobalStateContext = createContext<GlobalStateData>({} as GlobalStateData);

export const useGlobalState = (): GlobalStateData => useContext(GlobalStateContext);

export function GlobalStateProvider({ children }: GlobalStateProps) {
  const [globalState, setGlobalState] = useState<GlobalState>({});

  const addToGlobalState = (key: string, value: any) => {
    setGlobalState((prevValue) => ({
      ...prevValue,
      [key]: [...(prevValue[key] || []), value]
    }));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        addToGlobalState,
        globalState
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export class GlobalStateAdapter implements AddToGlobalState, GetGlobalState {
  constructor(
    private readonly params?: {
      addToGlobalState?: (key: string, value: any) => void;
      globalState?: {};
    }
  ) {}

  add(key: string, value: any): void {
    this.params.addToGlobalState(key, value);
  }

  get(key: string): any[] {
    return this.params.globalState[key];
  }
}
