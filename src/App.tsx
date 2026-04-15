import { Suspense, lazy } from 'react'

import { ScrollProgressBar } from './components'

const HeroSection = lazy(() => import('./sections/HeroSection').then((module) => ({ default: module.HeroSection })))
const AboutSection = lazy(() => import('./sections/AboutSection').then((module) => ({ default: module.AboutSection })))
const SkillsSection = lazy(() => import('./sections/SkillsSection').then((module) => ({ default: module.SkillsSection })))
const ExperienceSection = lazy(() => import('./sections/ExperienceSection').then((module) => ({ default: module.ExperienceSection })))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection').then((module) => ({ default: module.ProjectsSection })))
const ContactSection = lazy(() => import('./sections/ContactSection').then((module) => ({ default: module.ContactSection })))

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgressBar />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <a href="#hero" className="font-mono text-sm font-semibold tracking-[0.24em] text-black uppercase">
            PV / Android
          </a>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-black/66 transition hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="scroll-snap-y-optional pt-[68px]">
        <Suspense fallback={<div className="h-screen bg-white" />}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  )
}

export default App
