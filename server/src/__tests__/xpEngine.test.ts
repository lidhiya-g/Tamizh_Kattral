import { XPEngine } from '../services/xpEngine';

describe('XPEngine Math & Level Calculation Tests', () => {
  it('should correctly calculate Level 1 for 0 XP', () => {
    const result = XPEngine.calculateLevel(0);
    expect(result.level).toBe(1);
    expect(result.nextLevelXP).toBe(200);
  });

  it('should transition to Level 2 at 200 XP', () => {
    const result = XPEngine.calculateLevel(200);
    expect(result.level).toBe(2);
    expect(result.nextLevelXP).toBe(450);
  });

  it('should transition to Level 3 at 450 XP', () => {
    const result = XPEngine.calculateLevel(450);
    expect(result.level).toBe(3);
    expect(result.nextLevelXP).toBe(800);
  });
});
