import { motion } from 'framer-motion'

import { fadeIn, slideUp } from '../animations'
import { AndroidBot, ProjectShowcase, SectionShell, type ProjectItem } from '../components'

const projects: ProjectItem[] = [
  {
    name: 'Compose Commerce',
    summary: 'A polished checkout flow tuned for fast navigation, compact UI state, and confident mobile conversion paths.',
    impact: 'Built to keep the primary action obvious while shipping skeletons, validation, and payment states without visual noise.',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase Auth', 'Coroutines', 'Performance budgeting'],
    year: '2025',
    href: '#contact',
  },
  {
    name: 'Task Sync',
    summary: 'A productivity app concept centered on stable offline sync, quick capture, and reliable background refresh.',
    impact: 'The project focused on interaction consistency, optimistic updates, and a mobile-first hierarchy that survives edge cases.',
    stack: ['Android SDK', 'Room', 'WorkManager', 'Material 3', 'Offline sync'],
    year: '2024',
    href: '#contact',
  },
  {
    name: 'React Native Toolkit',
    summary: 'A shared interaction toolkit for teams aligning mobile behavior across Android and cross-platform surfaces.',
    impact: 'Useful when product teams need consistent interaction patterns, accessibility support, and reusable presentation primitives.',
    stack: ['React Native', 'TypeScript', 'Accessibility', 'API integrations', 'Design systems'],
    year: '2024',
    href: '#contact',
  },
]

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Interactive project showcases with a built-in repair loop."
      summary="Project details slide in as the section reaches view, with keyboard-navigable switching, image-space animation, and a decorative bug-fix motif anchored by the Android bot."
    >
      <div className="grid gap-8">
        <ProjectShowcase projects={projects} />
        <motion.div
          variants={fadeIn({ duration: 0.55 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          aria-hidden="true"
          className="grid gap-5 border border-black/8 bg-[linear-gradient(90deg,rgba(61,220,132,0.07),rgba(255,255,255,0.98))] p-6 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)] md:items-center"
        >
          <div className="grid place-items-center">
            <AndroidBot size={220} animated mode="fix" />
          </div>
          <motion.div variants={slideUp({ distance: 18, duration: 0.48 })} className="grid gap-3">
            <p className="font-mono text-[0.72rem] font-semibold tracking-[0.24em] text-black/55 uppercase">
              Bug fix animation
            </p>
            <p className="max-w-2xl text-sm leading-7 text-black/74 md:text-base md:leading-8">
              The repair scene stays lightweight, but it reinforces the portfolio’s interaction story: identify the problem, fix it with intention, and keep the final UI stable.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionShell>
  )
}
