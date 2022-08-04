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
  const [toastList, setToastList] = useState<ListToast[]>([]);

  const showToast = ({ text, type }: ShowToastParams) => {
    const id = String(new Date().getTime());
    setToastList((prev) => [...prev, { id, text, type }]);
  };

  const closeToast = (id?: string) => {
    const removeToastId = id || toastList.pop().id;
    const newList = toastList.filter((toast) => toast.id !== removeToastId);
    setToastList(newList);
  };

  let closeInterval;

  useEffect(() => {
    if (toastList.length > 0) {
      closeInterval = setInterval(closeToast, AUTO_CLOSE_TOAST_DELAY);
    }

    return () => {
      clearInterval(closeInterval);
    };
  }, [toastList]);

  const value = useMemo(() => ({ showToast }), []);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toastList.map(({ id, text, type }) => (
          <Toast key={id} text={text} type={type} closeToast={() => closeToast(id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
