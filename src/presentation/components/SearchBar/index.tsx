import React, {
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  KeyboardEventHandler,
  useRef
} from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Form } from './styles';

export type SearchBarType = 'add' | 'search';

export type SearchBarProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit: (value: string) => void;
  placeholder?: string;
  searchBarType?: SearchBarType;
};

type SearchBarElements = HTMLFormControlsCollection & {
  search: {
    value: string;
  };
};

export const mapSearchBarTypeToButtonText: Record<SearchBarType, string> = {
  add: 'Adicionar',
  search: 'Buscar'
};

export function SearchBar({
  onSubmit,
  placeholder = '',
  searchBarType = 'search',
  ...htmlProps
}: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      search: { value }
    } = e.currentTarget.elements as SearchBarElements;
    onSubmit(value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const { value } = e.target;
    onSubmit(value);
  };

  return (
    <Form {...htmlProps} onSubmit={handleSubmit}>
      <Input name="search" placeholder={placeholder} onKeyDown={handleEnterPress} />
      <Button type="submit">{mapSearchBarTypeToButtonText[searchBarType]}</Button>
    </Form>
  );
}
