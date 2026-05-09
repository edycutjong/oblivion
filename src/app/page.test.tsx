import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './page';
import { oblivionEncryptionService } from '@/lib/encrypt-ika';
import React from 'react';

vi.mock('jspdf', () => {
  return {
    jsPDF: class {
      setFontSize = vi.fn();
      setTextColor = vi.fn();
      text = vi.fn();
      save = vi.fn();
    }
  };
});

// Mock framer-motion to bypass animations
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      div: ({ children, initial, animate, exit, transition, whileHover, whileTap, variants, viewport, ...props }: any) => <div {...props}>{children}</div>,
      button: ({ children, initial, animate, exit, transition, whileHover, whileTap, variants, viewport, ...props }: any) => <button {...props}>{children}</button>,
      span: ({ children, initial, animate, exit, transition, whileHover, whileTap, variants, viewport, ...props }: any) => <span {...props}>{children}</span>,
    }
  };
});
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// Mock the components
vi.mock('@/components/StatusBar', () => ({
  StatusBar: () => <div data-testid="status-bar" />
}));

vi.mock('@/components/Footer', () => ({
  Footer: () => <div data-testid="footer" />
}));

// Mock the encryption service
vi.mock('@/lib/encrypt-ika', () => ({
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

  it('renders the home tab by default', () => {
    render(<Home />);
    expect(screen.getByText(/Enter Dark Pool/i)).toBeInTheDocument();
    expect(screen.getByTestId('status-bar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    render(<Home />);
    
    const auditTabButton = screen.getByText('COMPLIANCE');
    fireEvent.click(auditTabButton);
    act(() => { vi.runAllTimers(); });
    expect(screen.getByText('Compliance Portal')).toBeInTheDocument();
    
    const tradeTabButton = screen.getByText('TRADE');
    fireEvent.click(tradeTabButton);
    act(() => { vi.runAllTimers(); });
    expect(screen.getByText('New Order')).toBeInTheDocument();

    // Coverage for line 56: Click logo to go back home
    const logoButton = screen.getByText('OBLIVION');
    fireEvent.click(logoButton);
    act(() => { vi.runAllTimers(); });
    expect(screen.getByText(/Enter Dark Pool/i)).toBeInTheDocument();
  });

  it('navigates to trade from Hero onEnter (line 83 coverage)', () => {
    render(<Home />);
    const enterButton = screen.getByText(/Enter Dark Pool/i);
    fireEvent.click(enterButton);
    act(() => { vi.runAllTimers(); });
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
    
    // Navigate to trade tab first
    fireEvent.click(screen.getByText('TRADE'));
    act(() => { vi.runAllTimers(); });
    
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

    // Mock clipboard to test copying the hash
    const originalClipboard = navigator.clipboard;
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const copyHashButton = screen.getByTitle('Copy hash');
    fireEvent.click(copyHashButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('encrypted-hash');
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
    
    // Restore clipboard
    Object.assign(navigator, { clipboard: originalClipboard });

    // Click "Place Another Order" to reset state
    const placeAnotherOrderButton = screen.getByText('Place Another Order');
    fireEvent.click(placeAnotherOrderButton);
    expect(screen.getByText('Encrypt & Submit')).toBeInTheDocument();
  });

  it('handles decryption in audit tab', async () => {
    render(<Home />);
    
    fireEvent.click(screen.getByText('COMPLIANCE'));
    act(() => { vi.runAllTimers(); });
    
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

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    // Test Copy functionality
    const copyButton = screen.getByTitle('Copy address');
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('0x7F4B2E1C9D8A5F3607C4189B2D6E3B92');
    
    // Test notification appears and disappears
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();

    // Test Copy when clipboard is unavailable (line 22 coverage)
    const originalClipboard = navigator.clipboard;
    // @ts-expect-error Mocking for test
    delete navigator.clipboard;
    
    fireEvent.click(copyButton);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    
    // Restore clipboard
    Object.assign(navigator, { clipboard: originalClipboard });

    // Generate PDF Report
    const generatePdfButton = screen.getByText('Generate PDF Report');
    fireEvent.click(generatePdfButton);
  });
});
