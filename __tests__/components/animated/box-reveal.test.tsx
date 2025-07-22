import BoxReveal from '@/components/animated/box-reveal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('BoxReveal', () => {
  it('renders children correctly', () => {
    render(
      <BoxReveal>
        <h1>Test Content</h1>
      </BoxReveal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <BoxReveal className="custom-class">
        <div>Content</div>
      </BoxReveal>
    );

    const content = screen.getByText('Content');
    expect(content.parentElement).toHaveClass('custom-class');
  });

  it('renders with default width of full', () => {
    const { container } = render(
      <BoxReveal>
        <div>Content</div>
      </BoxReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: 'full' });
  });

  it('renders with fit-content width when specified', () => {
    const { container } = render(
      <BoxReveal width="fit-content">
        <div>Content</div>
      </BoxReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: 'fit-content' });
  });

  it('applies custom box color', () => {
    const { container } = render(
      <BoxReveal boxColor="red">
        <div>Content</div>
      </BoxReveal>
    );

    // The box color is applied to the motion div, we can check if it's rendered
    expect(
      container.querySelector('[style*="background: red"]')
    ).toBeInTheDocument();
  });

  it('applies custom duration', () => {
    render(
      <BoxReveal duration={2}>
        <div>Content</div>
      </BoxReveal>
    );

    // Since we're mocking framer-motion, we just ensure it renders without error
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has proper structure with motion divs', () => {
    const { container } = render(
      <BoxReveal>
        <div data-testid="content">Content</div>
      </BoxReveal>
    );

    // Check that the content is rendered
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Check that we have the wrapper div with proper styles
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      position: 'relative',
      overflow: 'hidden',
    });
  });

  it('renders multiple children correctly', () => {
    render(
      <BoxReveal>
        <h1>Title</h1>
        <p>Description</p>
      </BoxReveal>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
