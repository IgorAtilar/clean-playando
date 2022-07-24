import { render, screen } from '@/utils/test';
import { Logo } from '.';

describe('Presentation: Components/Logo', () => {
  it('should render the logo text correctly', () => {
    render(<Logo />);
    const text = screen.getByText('Clean Playando');
    expect(text).toBeInTheDocument();
  });
});
