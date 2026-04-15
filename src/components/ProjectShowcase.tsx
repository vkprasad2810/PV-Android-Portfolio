import { memo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'

import { fadeIn, slideUp } from '../animations'
import { AndroidBot } from './AndroidBot'

export type ProjectItem = {
  name: string
  summary: string
  impact: string
  stack: string[]
  year: string
  href?: string
}

type ProjectShowcaseProps = {
  projects: ProjectItem[]
}

function ProjectShowcaseBase({ projects }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  const safeIndex = activeIndex >= 0 && activeIndex < projects.length ? activeIndex : 0
  const activeProject = projects[safeIndex]

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!projects.length) {
      return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (safeIndex + 1) % projects.length
      setActiveIndex(nextIndex)
      tabsRef.current[nextIndex]?.focus()
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = (safeIndex - 1 + projects.length) % projects.length
      setActiveIndex(nextIndex)
      tabsRef.current[nextIndex]?.focus()
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      tabsRef.current[0]?.focus()
    }

    if (event.key === 'End') {
      event.preventDefault()
      const lastIndex = projects.length - 1
      setActiveIndex(lastIndex)
      tabsRef.current[lastIndex]?.focus()
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <div role="group" aria-label="Projects" onKeyDown={handleKeyDown} className="grid gap-3">
        {projects.map((project, index) => {
          const selected = index === safeIndex
          return (
            <motion.button
              key={project.name}
              ref={(node) => {
                tabsRef.current[index] = node
              }}
              type="button"
              aria-pressed={selected}
              aria-label={`Show project ${project.name}`}
              id={`project-tab-${index}`}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              variants={slideUp({ distance: 20, duration: 0.45, delay: index * 0.06 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className={[
                'w-full cursor-pointer border px-5 py-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]',
                selected
                  ? 'border-black/15 border-l-4 border-l-[#3DDC84] bg-[#3DDC84]/8 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
                  : 'border-black/10 border-l-4 border-l-transparent bg-white hover:border-black/18',
              ].join(' ')}
            >
              <span className="mb-2 inline-flex font-mono text-[0.72rem] font-semibold tracking-[0.22em] text-black/55 uppercase">
                {project.year}
              </span>
              <span className="mb-2 block text-[clamp(1.125rem,1.7vw,1.5rem)] leading-tight font-bold tracking-[-0.04em] text-black">
                {project.name}
              </span>
              <span className="block text-sm leading-7 text-black/72 md:text-base">{project.summary}</span>
            </motion.button>
          )
        })}
      </div>

      <motion.article
        id="project-panel"
        aria-labelledby={`project-tab-${safeIndex}`}
        key={activeProject.name}
        variants={fadeIn({ duration: 0.55 })}
        initial="hidden"
        animate="show"
        className="grid min-h-[460px] gap-6 border border-black/10 bg-[linear-gradient(180deg,rgba(61,220,132,0.08),rgba(255,255,255,1)_55%,rgba(0,0,0,0.02))] p-5 md:p-8"
      >
        <div aria-hidden="true" className="relative grid min-h-[260px] place-items-center overflow-hidden border border-black/8 bg-white">
          <div className="absolute right-4 top-4 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(61,220,132,0.28),rgba(61,220,132,0)_72%)]" />
          <div className="soft-grid absolute inset-0 opacity-50" />
          <div className="relative z-10 grid place-items-center gap-3">
            <AndroidBot size={168} animated mode="fix" />
            <p className="font-mono text-xs font-semibold tracking-[0.22em] text-black/72 uppercase">Bug Fix Animation</p>
          </div>
        </div>

        <div className="grid gap-4">
          <p className="font-mono text-[0.72rem] font-semibold tracking-[0.24em] text-black/55 uppercase">
            {activeProject.year}
          </p>
          <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.02] font-bold tracking-[-0.05em] text-black">
            {activeProject.name}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-black/76 md:text-base md:leading-8">{activeProject.impact}</p>
          <ul className="grid gap-2 pl-5 text-sm leading-7 text-black/82 md:text-base">
            {activeProject.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          {activeProject.href ? (
            <a
              href={activeProject.href}
              className="inline-flex w-fit items-center border border-black/14 px-4 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
            >
              View project
            </a>
          ) : null}
        </div>
      </motion.article>
    </div>
  )
}

export const ProjectShowcase = memo(ProjectShowcaseBase)
