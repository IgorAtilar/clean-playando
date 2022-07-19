import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { FilterBar, FilterBarProps } from '.';

describe('Presentation: Components/FilterBar', () => {
  const defaultProps: FilterBarProps = {
    placeholder: 'placeholder-test',
    onSubmit: () => {}
  };

  it('should show the button with the text "Filtrar" if filterBarType is "filter"', () => {
    const { rerender } = render(<FilterBar {...defaultProps} filterBarType="filter" />);
    const firstButton = screen.getByRole('button', { name: 'Filtrar' });
    expect(firstButton).toBeInTheDocument();
    rerender(<FilterBar {...defaultProps} />);
    const secondButton = screen.getByRole('button', { name: 'Filtrar' });
    expect(secondButton).toBeInTheDocument();
  });

  it('should show the button with the text "Limpar filtro" if filterBarType is "clear"', () => {
    render(<FilterBar {...defaultProps} filterBarType="clear" />);
    const button = screen.getByRole('button', { name: 'Limpar filtro' });
    expect(button).toBeInTheDocument();
  });

  describe('actions', () => {
    it('should call onSubmit with the correct value when user click on button', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<FilterBar {...defaultProps} onSubmit={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      const button = screen.getByRole('button');
      await user.type(input, text);
      await user.click(button);
      expect(handler).toHaveBeenCalledWith(text);
    });

    it('should call onSubmit callback when pressing enter on FilterBar input', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<FilterBar {...defaultProps} onSubmit={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      await user.type(input, `${text}{enter}`);
      expect(handler).toHaveBeenCalledWith(text);
    });
  });
});
