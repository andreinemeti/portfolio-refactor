// Simple unit test example for the data shape
import { projects } from '@/lib/data/projects';

test('projects have required shape', () => {
  for (const p of projects) {
    expect(typeof p.slug).toBe('string');
    expect(Array.isArray(p.tags)).toBe(true);
    expect(Array.isArray(p.images)).toBe(true);
  }
});
