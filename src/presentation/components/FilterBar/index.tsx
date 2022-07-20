import { FormEvent, useRef } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Container } from './styles';

export type FilterBarType = 'filter' | 'clear';

export type FilterBarProps = {
  filterBarType?: FilterBarType;
  onSubmit: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
};

export const mapFilterBarTypeToText: Record<FilterBarType, string> = {
  filter: 'Filtrar',
  clear: 'Limpar filtro'
};

export function FilterBar({
  filterBarType = 'filter',
  onSubmit,
  placeholder,
  onClear,
  className
}: FilterBarProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = inputRef.current;
    onSubmit(value);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  const handleFilter = () => {
    const { value } = inputRef.current;
    onSubmit(value);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  return (
    <Container className={className}>
      <form onSubmit={handleSubmit}>
        <Input ref={inputRef} name="filter" placeholder={placeholder} />
      </form>
      {filterBarType === 'filter' ? (
        <Button type="button" colorScheme="secondary" onClick={handleFilter}>
          {mapFilterBarTypeToText[filterBarType]}
        </Button>
      ) : (
        <Button type="button" colorScheme="secondary" onClick={() => onClear?.()}>
          {mapFilterBarTypeToText[filterBarType]}
        </Button>
      )}
    </Container>
  );
}
