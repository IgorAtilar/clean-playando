import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from './styles';

let modalRoot = document.getElementById('modal-root');

export type ModalProps = PropsWithChildren<{
  isOpen?: boolean;
}>;

export function Modal({ children, isOpen }: ModalProps) {
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(<ModalOverlay role="dialog">{children}</ModalOverlay>, modalRoot);
}
