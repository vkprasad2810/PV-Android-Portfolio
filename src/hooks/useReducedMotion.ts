import { useEffect, useState } from 'react'

import { prefersReducedMotion, prefersReducedMotionQuery } from '../utils/motion'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    prefersReducedMotion(),
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(prefersReducedMotionQuery)
    const legacyMediaQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void
    }

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches)
    }

    updatePreference()

    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }

    legacyMediaQuery.addListener?.(updatePreference)
    return () => legacyMediaQuery.removeListener?.(updatePreference)
  }, [])

  return reducedMotion
}
