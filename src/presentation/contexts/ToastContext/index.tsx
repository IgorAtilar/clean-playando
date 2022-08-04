import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Toast, ToastProps, ToastType } from '@/presentation/components/Toast';
import { ToastContainer } from './styles';

type ShowToastParams = {
  text: string;
  type: ToastType;
};

type ToastContextData = {
  showToast: (params: ShowToastParams) => void;
};

export const ToastContext = createContext({} as ToastContextData);

export const useToast = (): ToastContextData => useContext(ToastContext);

type ToastProviderProps = PropsWithChildren;

export type ListToast = ToastProps & {
  id: string;
};

const AUTO_CLOSE_TOAST_DELAY = 5000;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toastStack, setToastStack] = useState<ListToast[]>([]);

  const showToast = ({ text, type }: ShowToastParams) => {
    const id = String(new Date().getTime());
    setToastStack((prev) => [...prev, { id, text, type }]);
  };

  const closeToast = (id?: string) => {
    const removeToastId = id || toastStack.pop().id;
    const newList = toastStack.filter((toast) => toast.id !== removeToastId);
    setToastStack(newList);
  };

  let closeInterval;

  useEffect(() => {
    if (toastStack.length > 0) {
      closeInterval = setInterval(closeToast, AUTO_CLOSE_TOAST_DELAY);
    }

    return () => {
      clearInterval(closeInterval);
    };
  }, [toastStack]);

  const value = useMemo(() => ({ showToast }), []);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toastStack.map(({ id, text, type }) => (
          <Toast key={id} text={text} type={type} closeToast={() => closeToast(id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
