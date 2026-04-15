import { useEffect, useState } from 'react'

import { clamp, normalizeProgress } from '../utils/motion'

export type ScrollProgressState = {
  progress: number
  isAtTop: boolean
  isAtBottom: boolean
}

type Options = {
  enabled?: boolean
}

function getScrollMetrics() {
  const root = document.scrollingElement ?? document.documentElement
  const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 0)

  return {
    root,
    maxScroll,
    scrollTop: root.scrollTop,
  }
}

export function useScrollProgress(options: Options = {}): ScrollProgressState {
  const { enabled = true } = options
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    isAtTop: true,
    isAtBottom: false,
  })

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return
    }

    let frameId = 0

    const updateProgress = () => {
      const { maxScroll, scrollTop } = getScrollMetrics()
      const progress = maxScroll > 0 ? normalizeProgress(scrollTop, 0, maxScroll) : 0

      setState({
        progress,
        isAtTop: scrollTop <= 0,
        isAtBottom: maxScroll > 0 && scrollTop >= maxScroll - 1,
      })
    }

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateProgress()
      })
    }

    updateProgress()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [enabled])

  return {
    progress: clamp(state.progress, 0, 1),
    isAtTop: state.isAtTop,
    isAtBottom: state.isAtBottom,
  }
}

