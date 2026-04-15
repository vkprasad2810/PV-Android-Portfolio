import { memo } from 'react'
import { motion } from 'framer-motion'

import { slideUp, staggerChildren } from '../animations'

export type TimelineEntry = {
  period: string
  title: string
  company: string
  description: string
  bullets: string[]
}

type TimelineProps = {
  entries: TimelineEntry[]
}

function TimelineBase({ entries }: TimelineProps) {
  return (
    <motion.ol
      variants={staggerChildren(0.1, 0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative grid gap-8"
    >
      <div aria-hidden="true" className="absolute left-[0.95rem] top-4 bottom-4 w-px bg-[linear-gradient(180deg,rgba(61,220,132,0.9),rgba(0,0,0,0.08))]" />
      {entries.map((entry, index) => (
        <motion.li
          key={`${entry.title}-${entry.period}`}
          variants={slideUp({ distance: 22, duration: 0.6, delay: index * 0.04 })}
          className="grid grid-cols-[2rem_minmax(0,1fr)] gap-5 md:grid-cols-[2.25rem_minmax(0,1fr)] md:gap-8"
        >
          <div aria-hidden="true" className="mt-1.5 h-8 w-8 rounded-full border-2 border-[#3DDC84] bg-white shadow-[0_0_0_6px_rgba(61,220,132,0.12)] md:h-9 md:w-9" />
          <article className="border-b border-black/8 pb-8">
            <p className="mb-2 font-mono text-[0.72rem] font-semibold tracking-[0.28em] text-black/55 uppercase">{entry.period}</p>
            <h3 className="text-[clamp(1.2rem,2vw,1.7rem)] leading-tight font-bold tracking-[-0.04em] text-black">{entry.title}</h3>
            <p className="mt-2 text-sm font-semibold text-black/72 md:text-base">{entry.company}</p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-black/70 md:text-base md:leading-8">{entry.description}</p>
            <ul className="mt-4 grid gap-2 pl-5 text-sm leading-7 text-black/82 md:text-base">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </motion.li>
      ))}
    </motion.ol>
  )
}

export const Timeline = memo(TimelineBase)
