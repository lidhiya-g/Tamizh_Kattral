import { TamilDirectionGuide, WritingRegion } from './tamilWritingGuides';

export interface CanvasPoint {
  x: number; // relative percentage (0 - 100)
  y: number; // relative percentage (0 - 100)
  timestamp: number;
}

export type FailureReason =
  | 'INSUFFICIENT_WRITING'
  | 'WRONG_START'
  | 'WRONG_DIRECTION'
  | 'WRONG_REGION'
  | 'INCOMPLETE'
  | 'NONE';

export interface ValidationResult {
  result: 'good' | 'retry';
  isGood: boolean;
  failureReason: FailureReason;
  checks: {
    enoughWriting: boolean;
    correctStart: boolean;
    correctDirection: boolean;
    correctRegions: boolean;
    sufficientlyComplete: boolean;
  };
  message: string;
}

const DIRECTION_TOLERANCE_DEGREES = 65;
const COS_TOLERANCE = Math.cos((DIRECTION_TOLERANCE_DEGREES * Math.PI) / 180); // ~0.4226

const EXPECTED_VECTORS: Record<string, { x: number; y: number }> = {
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  'down-right': { x: 0.707, y: 0.707 },
  'loop-clockwise': { x: 0.707, y: 0.707 },
  up: { x: 0, y: -1 },
  'up-right': { x: 0.707, y: -0.707 },
  left: { x: -1, y: 0 },
  'down-left': { x: -0.707, y: 0.707 },
};

export function validateWritingAttempt(
  guide: TamilDirectionGuide,
  points: CanvasPoint[]
): ValidationResult {

  // CHECK 1: Enough Writing
  let enoughWriting = false;
  if (points && points.length >= 12) {
    let totalDist = 0;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;

      if (i > 0) {
        const dx = p.x - points[i - 1].x;
        const dy = p.y - points[i - 1].y;
        totalDist += Math.sqrt(dx * dx + dy * dy);
      }
    }

    const widthSpan = maxX - minX;
    const heightSpan = maxY - minY;
    const diagSpan = Math.sqrt(widthSpan * widthSpan + heightSpan * heightSpan);

    if (totalDist >= 35 && diagSpan >= 22) {
      enoughWriting = true;
    }
  }

  // Fallback for unguided character
  if (!guide.hasGuide || guide.startPoints.length === 0) {
    const isGood = enoughWriting;
    return {
      result: isGood ? 'good' : 'retry',
      isGood,
      failureReason: isGood ? 'NONE' : 'INSUFFICIENT_WRITING',
      checks: {
        enoughWriting,
        correctStart: true,
        correctDirection: true,
        correctRegions: true,
        sufficientlyComplete: true,
      },
      message: isGood
        ? 'Good! ✓ Your writing direction looks correct.'
        : 'Please try again. Complete more of the letter before checking.',
    };
  }

  // CHECK 2: Starting Point
  let correctStart = false;
  if (points && points.length > 0) {
    const firstPoint = points[0];
    let minStartDistance = Infinity;

    for (const sp of guide.startPoints) {
      const dx = firstPoint.x - sp.x;
      const dy = firstPoint.y - sp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minStartDistance) {
        minStartDistance = dist;
      }
    }

    if (minStartDistance <= 22) {
      correctStart = true;
    }
  }

  // CHECK 3: Writing Direction
  let correctDirection = false;

  if (points && points.length >= 5) {
    // Initial movement vector check (first 2-3 points)
    const initialP1 = points[0];
    const initialP2 = points[Math.min(2, points.length - 1)];
    const initDx = initialP2.x - initialP1.x;
    const initDy = initialP2.y - initialP1.y;
    const initLen = Math.sqrt(initDx * initDx + initDy * initDy);

    let initialOppositeDetected = false;
    if (initLen > 1.5 && guide.arrows.length > 0) {
      const firstExpectedDir = guide.arrows[0].direction;
      const expectedVec = EXPECTED_VECTORS[firstExpectedDir] || { x: 0.707, y: 0.707 };
      const initNormX = initDx / initLen;
      const initNormY = initDy / initLen;
      const initDot = initNormX * expectedVec.x + initNormY * expectedVec.y;

      // If initial movement is strictly opposite (dot product < -0.3)
      if (initDot < -0.3) {
        initialOppositeDetected = true;
      }
    }

    if (!initialOppositeDetected) {
      let matchedArrows = 0;
      const totalArrows = guide.arrows.length;

      for (const arrow of guide.arrows) {
        const targetVec = EXPECTED_VECTORS[arrow.direction] || { x: 1, y: 0 };
        let matchFound = false;

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.sqrt(dx * dx + dy * dy);

          if (len < 1.2) continue;

          const userVecX = dx / len;
          const userVecY = dy / len;

          const dotProd = userVecX * targetVec.x + userVecY * targetVec.y;
          if (dotProd >= COS_TOLERANCE) {
            matchFound = true;
            break;
          }
        }

        if (matchFound) {
          matchedArrows++;
        }
      }

      const matchRatio = totalArrows > 0 ? matchedArrows / totalArrows : 1;
      if (matchRatio >= 0.75) {
        correctDirection = true;
      }
    }
  }

  // CHECK 4 & 5: Required Regions & Completeness
  let correctRegions = false;
  let sufficientlyComplete = false;

  const requiredRegions = guide.requiredRegions || [];
  let visitedRegionsCount = 0;

  if (points && points.length > 0 && requiredRegions.length > 0) {
    const margin = 2; // tight percentage margin tolerance

    for (const reg of requiredRegions) {
      let visited = false;

      for (const p of points) {
        if (
          p.x >= reg.x - margin &&
          p.x <= reg.x + reg.width + margin &&
          p.y >= reg.y - margin &&
          p.y <= reg.y + reg.height + margin
        ) {
          visited = true;
          break;
        }
      }

      if (visited) {
        visitedRegionsCount++;
      }
    }

    correctRegions = visitedRegionsCount > 0;
    sufficientlyComplete = visitedRegionsCount === requiredRegions.length;
  } else if (requiredRegions.length === 0) {
    correctRegions = true;
    sufficientlyComplete = true;
  }

  // FAIL CLOSED COMBINATION
  const isGood =
    enoughWriting &&
    correctStart &&
    correctDirection &&
    correctRegions &&
    sufficientlyComplete;

  if (isGood) {
    return {
      result: 'good',
      isGood: true,
      failureReason: 'NONE',
      checks: {
        enoughWriting,
        correctStart,
        correctDirection,
        correctRegions,
        sufficientlyComplete,
      },
      message: 'Good! ✓ Your writing direction looks correct.',
    };
  }

  // Priority Failure Feedback Messages
  let failureReason: FailureReason = 'NONE';
  let message = 'Please try again.';

  if (!enoughWriting) {
    failureReason = 'INSUFFICIENT_WRITING';
    message = 'Please try again. Complete more of the letter before checking.';
  } else if (!correctStart) {
    failureReason = 'WRONG_START';
    message = 'Please try again. Start from the correct point.';
  } else if (!correctDirection) {
    failureReason = 'WRONG_DIRECTION';
    message = 'Please try again. Check the writing direction.';
  } else if (!sufficientlyComplete) {
    failureReason = 'INCOMPLETE';
    message = 'Please try again. Complete the whole letter.';
  } else if (!correctRegions) {
    failureReason = 'WRONG_REGION';
    message = 'Please try again. Follow the correct writing area and direction.';
  }

  return {
    result: 'retry',
    isGood: false,
    failureReason,
    checks: {
      enoughWriting,
      correctStart,
      correctDirection,
      correctRegions,
      sufficientlyComplete,
    },
    message,
  };
}
