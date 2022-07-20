import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'as'>;

function InputComponent({ ...htmlProps }: InputProps, ref) {
  return <StyledInput ref={ref} {...htmlProps} />;
}

export const Input = forwardRef(InputComponent);
