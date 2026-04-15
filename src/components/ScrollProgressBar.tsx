import { memo } from 'react'
import { motion } from 'framer-motion'

import { useScrollProgress } from '../hooks'

function ScrollProgressBarBase() {
  const { progress } = useScrollProgress()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-black/8">
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,#3DDC84,#1ea65a)]"
        animate={{ scaleX: progress }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
    </div>
  )
}

export const ScrollProgressBar = memo(ScrollProgressBarBase)
