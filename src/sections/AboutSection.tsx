import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { slideUp, staggerChildren } from '../animations'
import { useReducedMotion } from '../hooks'
import { SectionShell } from '../components'

gsap.registerPlugin(ScrollTrigger)

const aboutPoints = [
  'Compose-first interfaces with strong state modeling and deliberate transitions.',
  'Performance-sensitive mobile experiences that avoid noisy motion and layout shifts.',
  'Cross-functional delivery spanning Android, Firebase, APIs, and release polish.',
]

export function AboutSection() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (prefersReducedMotion || !panelRef.current || !glowRef.current) {
      return
    }

    // Keep the parallax extremely light so the section feels alive without
    // turning scroll into a heavy effect.
    const context = gsap.context(() => {
      gsap.to(glowRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      })
    }, panelRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Android engineering that stays calm at runtime."
      summary="The work is centered on dependable mobile behavior: clear hierarchy, efficient rendering, and animation used to explain state instead of decorate it."
    >
      <div ref={panelRef} className="relative grid gap-8 overflow-hidden border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(61,220,132,0.03))] p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div ref={glowRef} aria-hidden="true" className="absolute right-[8%] top-[-12%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(61,220,132,0.18),rgba(61,220,132,0.02)_48%,transparent_72%)] blur-xl" />
        <motion.div
          variants={staggerChildren(0.08, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 grid gap-5"
        >
          <motion.p variants={slideUp({ distance: 18, duration: 0.55 })} className="text-base leading-8 text-black/78 md:text-lg">
            I design for release quality, not just demos. That means architecture choices that hold up under real device constraints, thoughtful motion boundaries, and interfaces that still feel polished when data is late or offline.
          </motion.p>
          <motion.p variants={slideUp({ distance: 18, duration: 0.55, delay: 0.06 })} className="text-base leading-8 text-black/78 md:text-lg">
            This portfolio mirrors that approach: full-width sections, minimal framing, original copy, and just enough movement to create rhythm without adding clutter.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerChildren(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative z-10 grid gap-4"
        >
          {aboutPoints.map((point) => (
            <motion.li
              key={point}
              variants={slideUp({ distance: 16, duration: 0.48 })}
              className="border-b border-black/8 pb-4 text-sm leading-7 text-black/70 md:text-base"
            >
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionShell>
  )
}
