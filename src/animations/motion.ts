import { prefersReducedMotion, smoothStep } from '../utils/motion'

export type MotionDistance = number

export type MotionEase = readonly [number, number, number, number] | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear'

export type Transition = {
  delay?: number
  delayChildren?: number
  duration?: number
  ease?: MotionEase
  staggerChildren?: number
}

export type MotionTarget = {
  opacity?: number
  transition?: Transition
  x?: number
  y?: number
}

export type Variants = {
  hidden: MotionTarget
  show: MotionTarget
}

export type MotionConfig = {
  delay?: number
  duration?: number
  distance?: MotionDistance
  ease?: Transition['ease']
}

export type ViewportConfig = {
  amount?: number
  margin?: string
  once?: boolean
}

export const motionEase = [0.22, 1, 0.36, 1] as const
export const motionFastEase = [0.4, 0, 0.2, 1] as const

const defaultTransition: Transition = {
  duration: 0.6,
  ease: motionEase,
}

export function fadeIn(config: MotionConfig = {}): Variants {
  const {
    delay = 0,
    duration = 0.6,
    ease = motionEase,
  } = config

  return {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        ...defaultTransition,
        duration,
        delay,
        ease,
      },
    },
  }
}

export function slideUp(config: MotionConfig = {}): Variants {
  const {
    delay = 0,
    duration = 0.6,
    distance = 24,
    ease = motionEase,
  } = config

  return {
    hidden: {
      opacity: 0,
      y: distance,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ...defaultTransition,
        duration,
        delay,
        ease,
      },
    },
  }
}

export function staggerChildren(
  delayChildren = 0,
  staggerChildrenValue = 0.08,
): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildrenValue,
        delayChildren,
      },
    },
  }
}

export function viewportReveal(
  config: MotionConfig & ViewportConfig = {},
) {
  const {
    delay = 0,
    duration = 0.6,
    distance = 24,
    ease = motionEase,
    amount = 0.35,
    margin = '0px 0px -10% 0px',
    once = true,
  } = config

  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { amount, margin, once },
    variants: {
      hidden: {
        opacity: 0,
        y: distance,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ...defaultTransition,
          duration,
          delay,
          ease,
        },
      },
    },
  }
}

export function reducedMotionTransition(
  transition?: Transition,
): Transition {
  if (prefersReducedMotion()) {
    return {
      duration: 0,
    }
  }

  return transition ?? defaultTransition
}

export function microParallax(progress: number, amplitude = 12) {
  const eased = smoothStep(progress)
  return (eased - 0.5) * 2 * amplitude
}
