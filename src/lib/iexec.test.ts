import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OblivionEncryptionService } from './iexec';
import { IExec } from 'iexec';

// Mock the iexec module
vi.mock('iexec', () => {
  return {
    IExec: vi.fn().mockImplementation(function(this: { dataset: unknown }) {
      this.dataset = {
        encrypt: vi.fn(),
        decrypt: vi.fn(),
      };
    })
  };
});

describe('OblivionEncryptionService', () => {
  let service: OblivionEncryptionService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new OblivionEncryptionService();
  });

  it('should initialize successfully', () => {
    service.init();
    // Second call should return early
    service.init();
  });

  it('should encrypt order data', async () => {
    const orderData = { pair: 'SOL/ETH', size: '500000' };
    const result = await service.encryptOrderData(orderData);
    
    expect(result).toContain('0x');
    expect(result).toContain('[ENCRYPTED_IEXEC]');
    const hexPart = result.split('...')[0].replace('0x', '');
    const decoded = JSON.parse(Buffer.from(hexPart, 'hex').toString());
    expect(decoded).toEqual(orderData);
  });

  it('should decrypt for auditor with valid key', async () => {
    const validKey = 'vk_123456';
    const result = await service.decryptForAuditor(validKey);
    
    expect(result).toEqual({
      orderId: "ORD-9842",
      trader: "0x7F...3B92",
      size: "$500,000 (SOL)",
      destination: "ETH Mainnet (Ika)"
    });
  });

  it('should throw error for auditor with invalid key', async () => {
    const invalidKey = 'short';
    await expect(service.decryptForAuditor(invalidKey)).rejects.toThrow('Invalid viewing key');
  });

  it('should handle initialization failure and branches', async () => {
    // Force init failure
    vi.mocked(IExec).mockImplementationOnce(function() {
      throw new Error('Init failed');
    } as unknown as typeof IExec);
    
    const failService = new OblivionEncryptionService();
    // Method call will trigger init() which will fail
    const result = await failService.encryptOrderData({ test: true });
    expect(result).toContain('[ENCRYPTED_IEXEC]');
    
    // Test decrypt with failed init
    const decResult = await failService.decryptForAuditor('vk_failed_init');
    expect(decResult.orderId).toBe('ORD-9842');
  });
});
