import { SectionShell, Timeline, type TimelineEntry } from '../components'

const entries: TimelineEntry[] = [
  {
    period: '2024 - Present',
    title: 'Android Developer',
    company: 'Freelance Product Builds',
    description: 'Shipping Android features with Compose-first UI, state-driven flows, and calm interactions that stay readable under real release pressure.',
    bullets: [
      'Built app flows with predictable state transitions and minimal layout jitter.',
      'Optimized loading sequences and handoffs so the UI stays stable on slower devices.',
    ],
  },
  {
    period: '2022 - 2024',
    title: 'Frontend & Mobile Engineer',
    company: 'Product Studio',
    description: 'Worked across Android and React interfaces to keep behavior, performance, and release expectations aligned across teams.',
    bullets: [
      'Introduced reusable patterns for navigation, async feedback, and empty states.',
      'Collaborated with design and backend teams to simplify edge cases before they reached production.',
    ],
  },
  {
    period: 'Earlier',
    title: 'Independent Builder',
    company: 'Self-directed Product Work',
    description: 'Focused on practical app concepts, performance tuning, and interface systems that make codebases easier to extend.',
    bullets: [
      'Rebuilt portfolio and app concepts with a stronger accessibility baseline.',
      'Kept iteration loops small, focused, and measurable.',
    ],
  },
]

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="A vertical timeline with enough structure, not too much chrome."
      summary="The section stays linear and readable on mobile while still feeling premium on larger screens through spacing, pacing, and subtle reveal timing."
    >
      <Timeline entries={entries} />
    </SectionShell>
  )
}
