export const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

export function normalizeProgress(value: number, start: number, end: number) {
  if (end === start) {
    return 1
  }

  return clamp((value - start) / (end - start), 0, 1)
}

export function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

export function smoothStep(progress: number) {
  const clamped = clamp(progress, 0, 1)
  return clamped * clamped * (3 - 2 * clamped)
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false
  }

  return window.matchMedia(prefersReducedMotionQuery).matches
}

