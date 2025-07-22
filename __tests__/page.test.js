import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../src/pages/index';

describe('Page', () => {
  it('renders the page content', () => {
    render(<Page />);

    // Check for the main navigation brand text
    const brandText = screen.getByText('Space Odyssey');
    expect(brandText).toBeInTheDocument();

    // Check for navigation links - use getAllByRole since there are multiple Films links
    const filmsLinks = screen.getAllByRole('link', { name: /Films/i });
    const charactersLinks = screen.getAllByRole('link', {
      name: /Characters/i,
    });

    expect(filmsLinks.length).toBeGreaterThan(0);
    expect(charactersLinks.length).toBeGreaterThan(0);
  });
});
