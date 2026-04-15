import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

import { fadeIn, motionEase, slideUp, staggerChildren } from '../animations'
import { useReducedMotion } from '../hooks'
import { AndroidBot, SectionShell } from '../components'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const botRef = useRef<HTMLDivElement | null>(null)
  const crackRef = useRef<HTMLSpanElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (prefersReducedMotion || !heroRef.current) {
      return
    }

    // This GSAP sequence handles the custom "broken R gets fixed" beat without
    // pushing the rest of the page animation system away from Framer Motion.
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

      timeline
        .fromTo('.hero-copy', { opacity: 0, y: 32, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo(botRef.current, { xPercent: 26, opacity: 0, rotate: -8 }, { xPercent: 0, opacity: 1, rotate: 0, duration: 0.9 }, '-=0.45')
        .to(crackRef.current, { opacity: 0.08, duration: 0.3 }, '-=0.15')
        .to('.hero-letter', { textShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 }, '<')
        .fromTo(scrollRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.1')
    }, heroRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <SectionShell
      id="hero"
      variant="hero"
      style={{
        minHeight: 'calc(100svh - 68px)',
        background:
          'radial-gradient(circle at 18% 18%, rgba(61, 220, 132, 0.14), transparent 25%), radial-gradient(circle at 82% 20%, rgba(0, 0, 0, 0.06), transparent 18%), linear-gradient(180deg, #fff 0%, #fff 72%, rgba(61,220,132,0.04) 100%)',
      }}
    >
      <div ref={heroRef} className="grid min-h-[calc(100svh-68px)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={staggerChildren(0.15, 0.1)}
          initial="hidden"
          animate="show"
          className="hero-copy grid gap-6"
        >
          <motion.p variants={slideUp({ distance: 18, duration: 0.55 })} className="font-mono text-[0.74rem] font-semibold tracking-[0.34em] text-[#3DDC84] uppercase">
            Android Developer Portfolio
          </motion.p>
          <motion.h1 variants={fadeIn({ duration: 0.7 })} className="max-w-[10ch] text-[clamp(3.8rem,12vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.09em] text-black">
            Prasad Vetka
            <span className="hero-letter relative inline-flex">
              r
              <span
                ref={crackRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60 [clip-path:polygon(0_0,100%_0,100%_50%,0_85%)] [background:linear-gradient(135deg,transparent_40%,rgba(0,0,0,0.82)_47%,rgba(0,0,0,0.82)_52%,transparent_60%)] motion-safe:[animation:pv-glitch_4.8s_steps(2,end)_infinite]"
              />
            </span>
          </motion.h1>
          <motion.p variants={slideUp({ distance: 18, duration: 0.6, delay: 0.08 })} className="max-w-2xl text-base leading-8 text-black/74 md:text-xl">
            I craft Android products that feel clean under pressure: stable architecture, calm motion, fast interactions, and developer-focused systems that stay maintainable after launch.
          </motion.p>
          <motion.div variants={slideUp({ distance: 18, duration: 0.55, delay: 0.12 })} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center border border-black bg-black px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center border border-black/12 bg-white px-5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
            >
              Start a Conversation
            </a>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[420px] lg:min-h-[560px]">
          <div className="soft-grid absolute inset-0 opacity-55" />
          <div className="absolute inset-[8%_4%_8%_14%] border border-black/8 bg-[linear-gradient(180deg,rgba(61,220,132,0.06),rgba(255,255,255,0.94))]" />
          <div className="absolute left-[8%] top-[14%] max-w-[12rem] -rotate-6 border border-black/10 bg-white p-4 shadow-[0_22px_60px_rgba(0,0,0,0.06)]">
            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-black/56 uppercase">Repair Trigger</p>
            <div className="mt-3 flex min-h-24 items-center justify-center border border-black/10 bg-[#f8f8f8] text-[4.4rem] leading-none font-bold tracking-[-0.08em] text-black">
              <span className="hero-letter relative inline-flex">
                R
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-60 [clip-path:polygon(0_0,100%_0,100%_50%,0_85%)] [background:linear-gradient(135deg,transparent_40%,rgba(0,0,0,0.82)_47%,rgba(0,0,0,0.82)_52%,transparent_60%)] motion-safe:[animation:pv-glitch_4.8s_steps(2,end)_infinite]"
                />
              </span>
            </div>
          </div>

          <motion.div
            variants={fadeIn({ duration: 0.7, ease: motionEase })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            className="absolute inset-x-0 bottom-6 left-auto right-[4%] flex justify-end"
            ref={botRef}
          >
            <AndroidBot size={320} animated mode="hero" />
          </motion.div>

          <div className="absolute right-[6%] top-[10%] grid gap-3 border border-black/10 bg-white/88 p-4 backdrop-blur">
            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.24em] text-[#3DDC84] uppercase">Stack Focus</p>
            <p className="text-sm leading-7 text-black/72">Kotlin, Compose, Firebase, React Native, performance budgets, accessible UI.</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="mt-2 flex items-center gap-3 font-mono text-[0.7rem] font-medium tracking-[0.26em] text-black/52 uppercase">
        <span>Scroll to inspect builds</span>
        <span className="h-px w-14 bg-black/18 motion-safe:[animation:pv-pulse-line_1.5s_ease-in-out_infinite]" />
        <span aria-hidden="true" className="inline-block motion-safe:[animation:pv-bounce_1.2s_ease-in-out_infinite]">↓</span>
      </div>
    </SectionShell>
  )
}
