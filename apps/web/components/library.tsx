"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

import { ComponentCard } from "@/components/component-card"
import { demos } from "@/components/demos"
import { entriesFor, groupDetails, groups, registry } from "@/lib/registry"
import { site } from "@/lib/site"
import type { SourceMap } from "@/lib/sources"

const OVERVIEW_ID = "library-overview"

/** Tracks the last `[data-spy]` element whose top has scrolled past the header. */
function useActiveSection() {
  const [active, setActive] = React.useState(OVERVIEW_ID)

  React.useEffect(() => {
    let frame = 0
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-spy]"))

    function measure() {
      frame = 0
      const threshold = 96
      let current = OVERVIEW_ID
      for (const element of targets) {
        if (element.getBoundingClientRect().top - threshold <= 0) {
          current = element.id
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom && targets.length) {
        current = targets[targets.length - 1]!.id
      }
      setActive(current)
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return active
}

function NavLink({
  href,
  active,
  children,
  className,
}: {
  href: string
  active: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      className={cn(
        "block rounded-md px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active
          ? "bg-accent text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </a>
  )
}

function Rail({ activeId }: { activeId: string }) {
  return (
    <aside className="bg-background sticky top-13 hidden h-[calc(100svh-3.25rem)] flex-col overflow-y-auto border-e ps-3 pe-3 pt-6 pb-8 lg:flex [scrollbar-width:thin]">
      <nav aria-label="Component navigation" className="flex flex-col gap-6">
        <div>
          <h2 className="px-2.5 pb-1.5 text-sm font-medium">Getting started</h2>
          <NavLink href={`#${OVERVIEW_ID}`} active={activeId === OVERVIEW_ID}>
            Overview
          </NavLink>
        </div>
        {groups.map((group) => (
          <div key={group}>
            <h2 className="px-2.5 pb-1.5 text-sm font-medium">{group}</h2>
            <ul aria-label={group} className="flex flex-col">
              {entriesFor(group).map((entry) => (
                <li key={entry.id}>
                  <NavLink href={`#${entry.id}`} active={activeId === entry.id}>
                    {entry.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto border-t pt-4 ps-2.5">
        <p className="eyebrow">Install</p>
        <code className="mt-1.5 block font-mono text-xs">{site.packageName}</code>
      </div>
    </aside>
  )
}

function Outline({ activeId }: { activeId: string }) {
  const activeGroup = registry.find((entry) => entry.id === activeId)?.group

  return (
    <aside className="sticky top-13 hidden max-h-[calc(100svh-3.25rem)] overflow-y-auto px-5 pt-8 pb-8 xl:block">
      <nav aria-label="On this page" className="flex flex-col gap-1">
        <p className="eyebrow mb-2">On this page</p>
        <NavLink href={`#${OVERVIEW_ID}`} active={activeId === OVERVIEW_ID} className="px-2 py-1">
          Overview
        </NavLink>
        {groups.map((group) => (
          <NavLink
            key={group}
            href={`#${groupDetails[group].id}`}
            active={activeGroup === group || activeId === groupDetails[group].id}
            className="px-2 py-1"
          >
            {group}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function Library({ sources }: { sources: SourceMap }) {
  const activeId = useActiveSection()

  return (
    <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)_216px]">
      <Rail activeId={activeId} />
      <main id="main-content" tabIndex={-1} className="min-w-0 outline-none">
        <div className="mx-auto w-full max-w-4xl px-5 pt-10 pb-28 sm:px-8 lg:px-12">
          <header id={OVERVIEW_ID} data-spy>
            <p className="eyebrow mb-3">
              {site.name} · {site.tagline}
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Component library</h1>
            <p className="text-muted-foreground mt-2 text-base">
              <span className="tnum">{registry.length}</span> components. Preview, inspect, and reuse.
            </p>
          </header>

          <div className="mt-12 flex flex-col gap-16">
            {groups.map((group) => {
              const detail = groupDetails[group]
              return (
                <section key={group} id={detail.id} data-spy className="flex flex-col gap-10">
                  <header className="border-b pb-4">
                    <h2 className="text-2xl font-semibold tracking-[-0.02em]">{group}</h2>
                    <p className="text-muted-foreground mt-1 text-sm">{detail.description}</p>
                  </header>
                  {entriesFor(group).map((entry) => {
                    const Demo = demos[entry.id]
                    return (
                      <ComponentCard key={entry.id} entry={entry} sources={sources[entry.id]!}>
                        {Demo ? <Demo /> : null}
                      </ComponentCard>
                    )
                  })}
                </section>
              )
            })}
          </div>
        </div>
      </main>
      <Outline activeId={activeId} />
    </div>
  )
}

export { Library }
