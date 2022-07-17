import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import { renderHook } from '@/utils/test';
import { GlobalStateAdapter, GlobalStateProvider, useGlobalState } from './global-state-adapter';

describe('Infra: GlobalStateAdapter', () => {
  it('should add values on the GlobalState', () => {
    const wrapper = ({ children }) => <GlobalStateProvider>{children}</GlobalStateProvider>;
    const { result } = renderHook(() => useGlobalState(), { wrapper });
    const { addToGlobalState } = result.current;
    const globalStateAdapter = new GlobalStateAdapter({ addToGlobalState });

    const firstValue = faker.datatype.json();

    act(() => {
      globalStateAdapter.add('test', firstValue);
    });

    expect(result.current.globalState).toStrictEqual({
      test: [firstValue]
    });

    const secondValue = faker.datatype.json();

    act(() => {
      globalStateAdapter.add('test', secondValue);
    });

    expect(result.current.globalState).toStrictEqual({
      test: [firstValue, secondValue]
    });
  });

  it('should return the values on the GlobalState', () => {
    const wrapper = ({ children }) => <GlobalStateProvider>{children}</GlobalStateProvider>;
    const { result, rerender } = renderHook(() => useGlobalState(), { wrapper });
    const { addToGlobalState } = result.current;
    const globalStateAdapter = new GlobalStateAdapter({ addToGlobalState });

    const firstValue = faker.datatype.json();

    act(() => {
      globalStateAdapter.add('test', firstValue);
    });

    expect(result.current.globalState).toStrictEqual({
      test: [firstValue]
    });

    const secondValue = faker.datatype.json();

    act(() => {
      globalStateAdapter.add('test', secondValue);
    });

    rerender();

    expect(result.current.globalState).toStrictEqual({
      test: [firstValue, secondValue]
    });
  });
});
