import { act } from 'react-dom/test-utils';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { AllTheProviders, renderHook, screen } from '@/utils/test';
import { ToastProvider, AUTO_CLOSE_TOAST_DELAY, useToast } from '.';

describe('Presentation: Contexts/ToastContext', () => {
  it('should show the toasts when showToast is called', () => {
    const wrapper = ({ children }) => (
      <AllTheProviders>
        <ToastProvider>{children}</ToastProvider>
      </AllTheProviders>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    const { showToast } = result.current;
    const text = faker.lorem.words();
    act(() => {
      showToast({
        text,
        type: 'success'
      });
    });
    const toast = screen.getByText(text);
    expect(toast).toBeInTheDocument();
  });

  it(`should close toast when it is pressed`, async () => {
    const user = userEvent.setup();
    const wrapper = ({ children }) => (
      <AllTheProviders>
        <ToastProvider>{children}</ToastProvider>
      </AllTheProviders>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    const { showToast } = result.current;
    const text = faker.lorem.words();
    act(() => {
      showToast({
        text,
        type: 'success'
      });
    });
    const toast = screen.getByText(text);
    expect(toast).toBeInTheDocument();
    await user.click(toast);
    expect(toast).not.toBeInTheDocument();
  });

  it(`should close toast after ${AUTO_CLOSE_TOAST_DELAY}ms`, () => {
    jest.useFakeTimers();
    const wrapper = ({ children }) => (
      <AllTheProviders>
        <ToastProvider>{children}</ToastProvider>
      </AllTheProviders>
    );
    const { result, rerender } = renderHook(() => useToast(), { wrapper });
    const { showToast } = result.current;
    const text = faker.lorem.words();
    act(() => {
      showToast({
        text,
        type: 'success'
      });
    });
    const toast = screen.getByText(text);
    expect(toast).toBeInTheDocument();
    jest.advanceTimersByTime(AUTO_CLOSE_TOAST_DELAY);
    rerender();
    expect(toast).not.toBeInTheDocument();
  });
});
