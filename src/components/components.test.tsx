import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { TechStack } from './TechStack';
import React from 'react';

describe('Components', () => {
  describe('Footer', () => {
    it('renders the footer text', () => {
      render(<Footer />);
      expect(screen.getByText(/Oblivion — Encrypted OTC Trading/i)).toBeInTheDocument();
    });
  });

  describe('StatusBar', () => {
    it('renders status information', () => {
      render(<StatusBar />);
      expect(screen.getByText(/SYSTEM ONLINE/i)).toBeInTheDocument();
      expect(screen.getByText(/LATENCY:/i)).toBeInTheDocument();
    });
  });

  describe('TechStack', () => {
    it('renders the technology items', () => {
      render(<TechStack />);
      expect(screen.getByText(/Next.js 16/i)).toBeInTheDocument();
      expect(screen.getByText(/React 19/i)).toBeInTheDocument();
      expect(screen.getByText(/Solana/i)).toBeInTheDocument();
    });
  });
});
