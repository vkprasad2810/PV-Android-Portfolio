import { memo } from 'react'
import { motion } from 'framer-motion'

import { slideUp } from '../animations'

type TechChipProps = {
  label: string
  delay?: number
}

function TechChipBase({ label, delay = 0 }: TechChipProps) {
  return (
    <motion.span
      variants={slideUp({ delay, distance: 14, duration: 0.45 })}
      className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-[linear-gradient(180deg,rgba(61,220,132,0.16),rgba(61,220,132,0.06))] px-4 text-sm font-medium tracking-[-0.02em] text-black shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {label}
    </motion.span>
  )
}

export const TechChip = memo(TechChipBase)
