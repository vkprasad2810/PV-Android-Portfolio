import { memo } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  summary?: string
  id?: string
}

function SectionHeadingBase({ eyebrow, title, summary, id }: SectionHeadingProps) {
  return (
    <header className="grid max-w-3xl gap-4" aria-labelledby={id}>
      {eyebrow ? <p className="font-mono text-[0.72rem] font-semibold tracking-[0.34em] text-[#3DDC84] uppercase">{eyebrow}</p> : null}
      <h2 id={id} className="text-[clamp(2.25rem,5vw,4.8rem)] leading-[0.96] font-bold tracking-[-0.08em] text-black">
        {title}
      </h2>
      {summary ? <p className="max-w-2xl text-base leading-8 text-black/70 md:text-lg">{summary}</p> : null}
    </header>
  )
}

export const SectionHeading = memo(SectionHeadingBase)
