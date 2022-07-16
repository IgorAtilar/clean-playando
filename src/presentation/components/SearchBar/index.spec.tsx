import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/test';
import { SearchBar, SearchBarProps } from '.';

describe('Presentation: Components/SearchBar', () => {
  const defaultProps: SearchBarProps = {
    placeholder: 'placeholder-test',
    onSubmit: () => {}
  };

  it('should show the button with the text "Buscar" if searchBarType prop is "search" or not defined', () => {
    const { rerender } = render(<SearchBar {...defaultProps} searchBarType="search" />);
    const firstButton = screen.getByRole('button', { name: 'Buscar' });
    expect(firstButton).toBeInTheDocument();
    rerender(<SearchBar {...defaultProps} />);
    const secondButton = screen.getByRole('button', { name: 'Buscar' });
    expect(secondButton).toBeInTheDocument();
  });

  it('should show the button with the text "Adicionar" if searchBarType prop is "add"', () => {
    render(<SearchBar {...defaultProps} searchBarType="add" />);
    const button = screen.getByRole('button', { name: 'Adicionar' });
    expect(button).toBeInTheDocument();
  });

  describe('actions', () => {
    it('should call onSubmit with the correct value when user click on button', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<SearchBar {...defaultProps} onSubmit={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      const button = screen.getByRole('button');
      await user.type(input, text);
      await user.click(button);
      expect(handler).toHaveBeenCalledWith(text);
    });

    it('should call onSubmit when pressing enter on SearchBar input', async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      const text = faker.lorem.words();
      render(<SearchBar {...defaultProps} onSubmit={handler} />);
      const input = screen.getByPlaceholderText(defaultProps.placeholder);
      await user.type(input, `${text}{enter}`);
      expect(handler).toHaveBeenCalledWith(text);
    });
  });
});
