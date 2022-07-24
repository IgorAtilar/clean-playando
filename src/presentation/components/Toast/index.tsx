import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  ToastSuccessContainer,
  ToastErrorContainer,
  ToastBody,
  ToastHeader
} from './styles';

let toastRoot = document.getElementById('toast-root');

export type ToastType = 'success' | 'error';

export type ToastProps = {
  isOpen?: boolean;
  text: string;
  type?: ToastType;
  closeToast: () => void;
  autoCloseDelay?: number;
};

const mapTypeToToastContainer = {
  success: ToastSuccessContainer,
  error: ToastErrorContainer
};

export function Toast({ isOpen, text, type = 'success', closeToast, autoCloseDelay }: ToastProps) {
  let timeout;

  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.setAttribute('id', 'toast-root');
    document.body.appendChild(toastRoot);
  }

  const ToastContainer = mapTypeToToastContainer[type];

  if (!isOpen) return null;

  useEffect(() => {
    if (!timeout && autoCloseDelay) {
      timeout = setTimeout(closeToast, autoCloseDelay);
    }

    return () => {
      if (timeout && autoCloseDelay) {
        clearTimeout(timeout);
      }
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <Container role="dialog">
      <ToastContainer>
        <ToastHeader>
          <button type="button" onClick={closeToast}>
            Fechar
          </button>
        </ToastHeader>
        <ToastBody>
          <span>{type === 'success' ? '🥳' : '😥'}</span>
          {text}
        </ToastBody>
      </ToastContainer>
    </Container>,
    toastRoot
  );
}
