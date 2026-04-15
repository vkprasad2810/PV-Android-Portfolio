import { memo } from 'react'
import { motion } from 'framer-motion'

import { slideUp, staggerChildren } from '../animations'

type SocialLink = {
  label: string
  href: string
  title: string
}

type SocialLinksProps = {
  links: SocialLink[]
}

function SocialLinksBase({ links }: SocialLinksProps) {
  return (
    <motion.ul
      variants={staggerChildren(0, 0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="flex flex-wrap gap-3"
    >
      {links.map((link) => (
        <li key={link.label}>
          <motion.a
            href={link.href}
            title={link.title}
            variants={slideUp({ distance: 16, duration: 0.45 })}
            whileHover={{ y: -2 }}
            className="inline-flex min-h-11 items-center gap-3 border border-black/12 bg-white px-4 text-sm font-semibold text-black transition hover:border-black/22 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#3DDC84] shadow-[0_0_0_6px_rgba(61,220,132,0.12)]" />
            {link.label}
          </motion.a>
        </li>
      ))}
    </motion.ul>
  )
}

export const SocialLinks = memo(SocialLinksBase)
