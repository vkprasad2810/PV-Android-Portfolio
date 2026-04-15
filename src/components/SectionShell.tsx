import type { CSSProperties, ReactNode } from 'react'

type SectionShellProps = {
  id: string
  eyebrow?: string
  title?: string
  summary?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  variant?: 'default' | 'hero'
}

export function SectionShell({
  id,
  eyebrow,
  title,
  summary,
  children,
  className,
  style,
  variant = 'default',
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={[
        'relative w-full snap-start overflow-hidden bg-white text-black',
        variant === 'hero' ? 'border-none' : 'border-t hairline-border',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div className={`section-frame relative ${variant === 'hero' ? 'py-12 md:py-16' : 'py-20 md:py-24 lg:py-28'}`}>
        {(eyebrow || title || summary) && (
          <header className="mb-10 grid max-w-3xl gap-4 md:mb-14">
            {eyebrow ? <p className="font-mono text-[0.72rem] font-semibold tracking-[0.34em] text-[#3DDC84] uppercase">{eyebrow}</p> : null}
            {title ? <h2 id={`${id}-title`} className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[0.96] font-bold tracking-[-0.08em]">{title}</h2> : null}
            {summary ? <p className="max-w-2xl text-base leading-8 text-black/70 md:text-lg">{summary}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
