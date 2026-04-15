import { motion } from 'framer-motion'

import { slideUp } from '../animations'
import { SectionShell, SocialLinks } from '../components'

const links = [
  { label: 'GitHub', href: 'https://github.com/prasadvetkar', title: 'Open GitHub profile' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prasad-vetkar', title: 'Open LinkedIn profile' },
  { label: 'Play Store', href: 'https://play.google.com/store/apps/dev?id=5700313618786177705', title: 'Open Play Store listing' },
]

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let’s build the next Android release."
      summary="A minimal close with a direct CTA, clear social paths, and enough breathing room to end the page cleanly."
    >
      <div className="grid gap-6 border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(61,220,132,0.06))] p-6 md:p-10">
        <motion.a
          variants={slideUp({ distance: 16, duration: 0.48 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          href="mailto:prasad.vetkar.dev@gmail.com"
          className="inline-flex min-h-12 w-fit items-center border border-black bg-[#3DDC84] px-5 text-sm font-bold text-black transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
        >
          Email Prasad
        </motion.a>
        <SocialLinks links={links} />
      </div>
    </SectionShell>
  )
}
