import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './page';
import { oblivionEncryptionService } from '@/lib/iexec';
import React from 'react';

// Mock the components
vi.mock('@/components/StatusBar', () => ({
  StatusBar: () => <div data-testid="status-bar" />
}));

vi.mock('@/components/Footer', () => ({
  Footer: () => <div data-testid="footer" />
}));

// Mock the encryption service
vi.mock('@/lib/iexec', () => ({
  oblivionEncryptionService: {
    encryptOrderData: vi.fn(),
    decryptForAuditor: vi.fn(),
  }
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('renders the trade tab by default', () => {
    render(<Home />);
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByTestId('status-bar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    render(<Home />);
    
    const auditTabButton = screen.getByText('COMPLIANCE AUDIT');
    fireEvent.click(auditTabButton);
    expect(screen.getByText('Compliance Portal')).toBeInTheDocument();
    
    const tradeTabButton = screen.getByText('TRADE');
    fireEvent.click(tradeTabButton);
    expect(screen.getByText('New Order')).toBeInTheDocument();
  });

  it('handles placing an order', async () => {
    // Return a promise that we can control
    let resolveEncrypt: (val: string) => void;
    const encryptPromise = new Promise<string>((resolve) => {
      resolveEncrypt = resolve;
    });
    vi.mocked(oblivionEncryptionService.encryptOrderData).mockReturnValue(encryptPromise);
    
    render(<Home />);
    
    const submitButton = screen.getByText('Encrypt & Submit');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    
    await act(async () => {
      resolveEncrypt!('encrypted-hash');
    });
    
    expect(screen.getByText('encrypted-hash')).toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByText('2. P2P Dark Pool Match')).toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(2200); // 3000 total
    });
    expect(screen.getByText('3. Ika MPC Settlement')).toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(3000); // 6000 total
    });
    expect(screen.getByText('Trade Settled Successfully')).toBeInTheDocument();
  });

  it('handles decryption in audit tab', async () => {
    render(<Home />);
    
    fireEvent.click(screen.getByText('COMPLIANCE AUDIT'));
    
    const input = screen.getByPlaceholderText(/Paste Viewing Key/i);
    const decryptButton = screen.getByText('Decrypt Order');
    
    // Test failure
    vi.mocked(oblivionEncryptionService.decryptForAuditor).mockRejectedValue(new Error('Invalid key'));
    window.alert = vi.fn();
    
    fireEvent.change(input, { target: { value: 'wrong-key' } });
    fireEvent.click(decryptButton);
    
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(window.alert).toHaveBeenCalledWith('Invalid viewing key.');
    
    // Test success
    vi.mocked(oblivionEncryptionService.decryptForAuditor).mockResolvedValue({
      orderId: "ORD-9842",
      trader: "0x7F...3B92",
      size: "$500,000 (SOL)",
      destination: "ETH Mainnet (Ika)"
    });
    
    fireEvent.change(input, { target: { value: 'valid-key' } });
    fireEvent.click(decryptButton);
    
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(screen.getByText('Access Granted: Order Decrypted')).toBeInTheDocument();
    expect(screen.getByText('ORD-9842')).toBeInTheDocument();
  });
});
