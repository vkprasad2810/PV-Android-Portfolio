import { motion } from 'framer-motion'

import { staggerChildren } from '../animations'
import { SectionShell, TechChip } from '../components'

const skills = [
  'Kotlin',
  'Jetpack Compose',
  'Android SDK',
  'Firebase',
  'React Native',
  'StateFlow',
  'Coroutines',
  'REST APIs',
  'Room',
  'WorkManager',
]

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Core stack, shipped cleanly."
      summary="No meters, no faux expertise scales. Just the technologies and delivery patterns I reach for when building reliable Android products."
    >
      <motion.ul
        variants={staggerChildren(0.05, 0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill, index) => (
          <li key={skill}>
            <TechChip label={skill} delay={index * 0.03} />
          </li>
        ))}
      </motion.ul>
    </SectionShell>
  )
}
