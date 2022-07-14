import { HTMLAttributes } from 'react';

import { StyledInput } from './styles';

export type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'as'>;

export function Input({ ...htmlProps }: InputProps) {
  return <StyledInput {...htmlProps} />;
}
