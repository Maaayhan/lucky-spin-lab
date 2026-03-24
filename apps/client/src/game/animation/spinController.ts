import { REWARD_TABLE } from '../config/rewards';

const SEGMENT_COUNT = REWARD_TABLE.length;
const FULL_CIRCLE = Math.PI * 2;
const SEGMENT_ANGLE = FULL_CIRCLE / SEGMENT_COUNT;

// Minimum full rotations before stopping
const MIN_ROTATIONS = 5;
const MAX_ROTATIONS = 8;

/**
 * Easing function: ease-out cubic
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Easing function: ease-out quintic (smoother stop)
 */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

export interface SpinAnimationOptions {
  targetSegmentIndex: number;
  onUpdate: (rotation: number) => void;
  onComplete: () => void;
  durationMs?: number;
}

/**
 * Calculate the target rotation so the wheel lands on the correct segment.
 * The pointer is at the TOP (angle = -PI/2 = 270 degrees from standard).
 * Segment 0 starts at -PI/2 in drawing. We need the midpoint of targetSegment
 * to land at the TOP (-PI/2).
 */
function calculateTargetRotation(currentRotation: number, segmentIndex: number): number {
  // Mid-angle of segment i in the wheel's local space (before any rotation):
  // segment i midpoint = i * segmentAngle + segmentAngle/2 - PI/2
  // We want this midpoint to be at -PI/2 (top), so we need rotation such that:
  // (midAngle + rotation) mod 2PI = 0 (i.e., pointing "up" which is -PI/2 in our drawing)

  const segmentMidAngle = segmentIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

  // Target rotation so segment mid lands at top (0 radians offset from -PI/2 start)
  let targetAngle = -segmentMidAngle;

  // Normalize targetAngle to [0, 2PI)
  targetAngle = ((targetAngle % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE;

  // Current rotation normalized
  const currentNorm = ((currentRotation % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE;

  // How much we need to rotate to reach target from current (always positive / clockwise)
  let delta = targetAngle - currentNorm;
  if (delta < 0) delta += FULL_CIRCLE;

  // Add minimum full rotations for the spinning effect
  const extraRotations =
    MIN_ROTATIONS + Math.floor(Math.random() * (MAX_ROTATIONS - MIN_ROTATIONS));
  return currentRotation + delta + extraRotations * FULL_CIRCLE;
}

/**
 * Animate the wheel spinning to a target segment.
 * Uses requestAnimationFrame with easing.
 */
export function spinToSegment(options: SpinAnimationOptions): void {
  const { targetSegmentIndex, onUpdate, onComplete, durationMs = 4000 } = options;

  // We need to get the current rotation from outside; pass it in via closure
  // We'll use a module-level variable updated on each call
  const startRotation = currentWheelRotation;
  const endRotation = calculateTargetRotation(startRotation, targetSegmentIndex);

  const startTime = performance.now();

  function tick(now: number): void {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / durationMs, 1);
    const easedT = easeOutQuint(t);
    const rotation = startRotation + (endRotation - startRotation) * easedT;

    currentWheelRotation = rotation;
    onUpdate(rotation);

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      onComplete();
    }
  }

  requestAnimationFrame(tick);
}

// Module-level state to track current wheel rotation across spins
let currentWheelRotation = 0;

export function setCurrentRotation(rotation: number): void {
  currentWheelRotation = rotation;
}

export function getCurrentRotation(): number {
  return currentWheelRotation;
}
