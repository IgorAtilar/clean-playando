import { FormEvent, useRef } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Container } from './styles';

export type FilterBarType = 'filter' | 'clear';

export type FilterBarProps = {
  type: FilterBarType;
  onFilter: (value: string) => void;
  placeholder?: string;
  onClearFilter: () => void;
  className?: string;
};

export const mapFilterBarTypeToText: Record<FilterBarType, string> = {
  filter: 'Filtrar',
  clear: 'Limpar filtro'
};

export function FilterBar({
  type,
  onFilter,
  placeholder,
  onClearFilter,
  className
}: FilterBarProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = inputRef.current;
    onFilter(value);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  const handleFilter = () => {
    const { value } = inputRef.current;
    onFilter(value);
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  return (
    <Container className={className}>
      <form onSubmit={handleSubmit}>
        <Input ref={inputRef} name="filter" placeholder={placeholder} />
      </form>
      {type === 'filter' ? (
        <Button type="button" colorScheme="secondary" onClick={handleFilter}>
          {mapFilterBarTypeToText[type]}
        </Button>
      ) : (
        <Button type="button" colorScheme="secondary" onClick={() => onClearFilter?.()}>
          {mapFilterBarTypeToText[type]}
        </Button>
      )}
    </Container>
  );
}
