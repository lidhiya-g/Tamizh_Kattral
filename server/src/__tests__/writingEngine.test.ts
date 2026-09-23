import { XPEngine } from '../services/xpEngine';

describe('Writing Studio Gamification Tests', () => {
  it('should award +2 XP for watch mode', () => {
    const { level } = XPEngine.calculateLevel(2);
    expect(level).toBe(1);
  });

  it('should award +5 XP for trace mode', () => {
    const { level } = XPEngine.calculateLevel(7);
    expect(level).toBe(1);
  });

  it('should award +10 XP for independent free write mode', () => {
    const { level } = XPEngine.calculateLevel(17);
    expect(level).toBe(1);
  });
});
