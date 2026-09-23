import { getWritingGuideForCharacter } from '../utils/tamilWritingGuides';
import { validateWritingAttempt, CanvasPoint } from '../utils/writingDirectionValidator';

describe('Tamil Writing Practice Fail-Closed Validator Tests (Character: "அ")', () => {
  const guideA = getWritingGuideForCharacter('அ');

  it('TEST 1 — NO WRITING: should fail with RETRY when no points are drawn', () => {
    const points: CanvasPoint[] = [];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('INSUFFICIENT_WRITING');
    expect(result.message).toContain('Please try again');
  });

  it('TEST 2 — TINY DOT: should fail with RETRY when only a tiny dot/short mark is placed', () => {
    const points: CanvasPoint[] = [
      { x: 34, y: 32, timestamp: 100 },
      { x: 34.2, y: 32.2, timestamp: 120 },
      { x: 34.4, y: 32.4, timestamp: 140 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('INSUFFICIENT_WRITING');
    expect(result.message).toContain('Complete more of the letter');
  });

  it('TEST 3 — INCOMPLETE LETTER: should fail with RETRY when stem region is missing', () => {
    // Draws top loop and left curve, but skips vertical stem
    const points: CanvasPoint[] = [
      { x: 34, y: 32, timestamp: 100 },
      { x: 38, y: 36, timestamp: 150 },
      { x: 44, y: 44, timestamp: 200 },
      { x: 42, y: 55, timestamp: 250 },
      { x: 38, y: 65, timestamp: 300 },
      { x: 45, y: 72, timestamp: 350 },
      { x: 50, y: 72, timestamp: 400 },
      { x: 52, y: 72, timestamp: 450 },
      { x: 54, y: 72, timestamp: 500 },
      { x: 56, y: 72, timestamp: 550 },
      { x: 58, y: 72, timestamp: 600 },
      { x: 60, y: 72, timestamp: 650 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('INCOMPLETE');
    expect(result.message).toContain('Complete the whole letter');
  });

  it('TEST 4 — WRONG STARTING POINT: should fail with RETRY when starting far from start dot', () => {
    // Starts at x: 90, y: 90 (far from start dot 34, 32)
    const points: CanvasPoint[] = [
      { x: 90, y: 90, timestamp: 100 },
      { x: 88, y: 88, timestamp: 150 },
      { x: 85, y: 85, timestamp: 200 },
      { x: 82, y: 82, timestamp: 250 },
      { x: 78, y: 78, timestamp: 300 },
      { x: 75, y: 75, timestamp: 350 },
      { x: 70, y: 70, timestamp: 400 },
      { x: 65, y: 65, timestamp: 450 },
      { x: 60, y: 60, timestamp: 500 },
      { x: 55, y: 55, timestamp: 550 },
      { x: 50, y: 50, timestamp: 600 },
      { x: 45, y: 45, timestamp: 650 },
      { x: 40, y: 40, timestamp: 700 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('WRONG_START');
    expect(result.message).toContain('Start from the correct point');
  });

  it('TEST 5 — WRONG DIRECTION: should fail with RETRY when moving in opposite direction', () => {
    // Starts at start dot (34, 32) but moves UP and LEFT (opposite of down-right/loop)
    const points: CanvasPoint[] = [
      { x: 34, y: 32, timestamp: 100 },
      { x: 30, y: 28, timestamp: 150 },
      { x: 25, y: 22, timestamp: 200 },
      { x: 20, y: 16, timestamp: 250 },
      { x: 15, y: 10, timestamp: 300 },
      { x: 10, y: 5, timestamp: 350 },
      { x: 25, y: 30, timestamp: 400 },
      { x: 38, y: 60, timestamp: 450 },
      { x: 50, y: 70, timestamp: 500 },
      { x: 65, y: 30, timestamp: 550 },
      { x: 65, y: 50, timestamp: 600 },
      { x: 65, y: 70, timestamp: 650 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('WRONG_DIRECTION');
    expect(result.message).toContain('Check the writing direction');
  });

  it('TEST 6 — WRONG WAY / WRONG REGION: should fail with RETRY when drawing in unrelated region', () => {
    // Draws long stroke only in top-right corner (80, 10 to 95, 30)
    const points: CanvasPoint[] = [
      { x: 80, y: 10, timestamp: 100 },
      { x: 82, y: 12, timestamp: 150 },
      { x: 85, y: 15, timestamp: 200 },
      { x: 88, y: 18, timestamp: 250 },
      { x: 90, y: 20, timestamp: 300 },
      { x: 92, y: 22, timestamp: 350 },
      { x: 94, y: 25, timestamp: 400 },
      { x: 95, y: 28, timestamp: 450 },
      { x: 92, y: 30, timestamp: 500 },
      { x: 90, y: 32, timestamp: 550 },
      { x: 88, y: 34, timestamp: 600 },
      { x: 85, y: 36, timestamp: 650 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.message).toContain('Please try again');
  });

  it('TEST 7 — CORRECT DIRECTION BUT INCOMPLETE: should fail with RETRY when stopping early', () => {
    // Follows correct direction for loop and curve, but stops before horizontal sweep & vertical stem
    const points: CanvasPoint[] = [
      { x: 34, y: 32, timestamp: 100 },
      { x: 38, y: 36, timestamp: 150 },
      { x: 44, y: 44, timestamp: 200 },
      { x: 40, y: 52, timestamp: 250 },
      { x: 36, y: 60, timestamp: 300 },
      { x: 35, y: 62, timestamp: 350 },
      { x: 36, y: 63, timestamp: 400 },
      { x: 37, y: 64, timestamp: 450 },
      { x: 38, y: 65, timestamp: 500 },
      { x: 39, y: 66, timestamp: 550 },
      { x: 40, y: 67, timestamp: 600 },
      { x: 41, y: 68, timestamp: 650 },
    ];
    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('retry');
    expect(result.isGood).toBe(false);
    expect(result.failureReason).toBe('INCOMPLETE');
    expect(result.message).toContain('Complete the whole letter');
  });

  it('TEST 8 — CORRECT PRACTICE: should pass with "good" when starting correctly, following direction, and completing all regions', () => {
    // Complete practice for 'அ' passing through loop, left-curve, bottom-sweep, top-stem, and bottom-stem
    const points: CanvasPoint[] = [
      // 1. Start Loop (top-left loop region: 26, 24)
      { x: 34, y: 32, timestamp: 100 },
      { x: 38, y: 36, timestamp: 140 },
      { x: 36, y: 42, timestamp: 180 },
      { x: 30, y: 40, timestamp: 220 },
      { x: 28, y: 34, timestamp: 260 },
      // 2. Left Curve (left-curve region: 28, 46)
      { x: 32, y: 48, timestamp: 300 },
      { x: 38, y: 56, timestamp: 340 },
      // 3. Bottom Sweep (bottom-sweep region: 46, 64)
      { x: 48, y: 68, timestamp: 380 },
      { x: 56, y: 72, timestamp: 420 },
      { x: 64, y: 70, timestamp: 460 },
      // 4. Top Stem (top-stem region: 64, 20) & Bottom Stem (bottom-stem region: 64, 55)
      { x: 72, y: 22, timestamp: 500 },
      { x: 72, y: 35, timestamp: 540 },
      { x: 72, y: 50, timestamp: 580 },
      { x: 72, y: 65, timestamp: 620 },
      { x: 72, y: 80, timestamp: 660 },
    ];

    const result = validateWritingAttempt(guideA, points);
    expect(result.result).toBe('good');
    expect(result.isGood).toBe(true);
    expect(result.failureReason).toBe('NONE');
    expect(result.message).toContain('Good! ✓');
  });
});
