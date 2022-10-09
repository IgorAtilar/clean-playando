import ReactDOM from 'react-dom';
import { PropsWithChildren, useEffect } from 'react';
import { ModalOverlay } from './styles';

let modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : undefined;

export type ModalProps = PropsWithChildren<{
  isOpen?: boolean;
}>;

export function Modal({ children, isOpen }: ModalProps) {
  useEffect(() => {
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(<ModalOverlay role="dialog">{children}</ModalOverlay>, modalRoot);
}
