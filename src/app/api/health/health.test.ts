import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('Health API', () => {
  it('returns ok status', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('environment');
  });
});
