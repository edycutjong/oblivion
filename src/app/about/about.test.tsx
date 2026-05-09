import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders about page content', () => {
    render(<AboutPage />);
    
    expect(screen.getByText('Oblivion')).toBeInTheDocument();
    expect(screen.getByText('Encrypted OTC Trading')).toBeInTheDocument();
    expect(screen.getByText('WHAT IT DOES')).toBeInTheDocument();
    expect(screen.getByText('TECH STACK')).toBeInTheDocument();
    expect(screen.getByText('HACKATHON')).toBeInTheDocument();
  });

  it('contains links to dashboard', () => {
    render(<AboutPage />);
    const links = screen.getAllByRole('link');
    expect(links.some(link => link.getAttribute('href') === '/')).toBe(true);
  });

  it('renders tech stack badges', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('Solana')).toBeInTheDocument();
  });
});
