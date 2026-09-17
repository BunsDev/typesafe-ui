"use client"

import * as React from "react"
import { Link2Icon } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"

import { CodeSnippet } from "@/components/code-snippet"
import type { RegistryEntry } from "@/lib/registry"
import type { EntrySources } from "@/lib/sources"

function ComponentCard({
  entry,
  sources,
  children,
}: {
  entry: RegistryEntry
  sources: EntrySources
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<"preview" | "source">("preview")
  const headingId = `${entry.id}-title`
  const showingSource = view === "source"

  return (
    <article
      id={entry.id}
      data-spy
      aria-labelledby={headingId}
      tabIndex={-1}
      className="flex min-w-0 flex-col gap-4 outline-none"
    >
      <header className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 id={headingId} className="text-xl font-semibold tracking-[-0.02em]">
            <a
              href={`#${entry.id}`}
              className="group/permalink inline-flex items-center gap-2 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              title={`Link to ${entry.title}`}
            >
              {entry.title}
              <Link2Icon className="text-muted-foreground size-4 opacity-0 transition-opacity group-hover/permalink:opacity-100 group-focus-visible/permalink:opacity-100" />
            </a>
          </h3>
          <Badge variant="outline" className="font-mono text-[10px] tracking-wide uppercase">
            Component
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{entry.description}</p>
      </header>

      <Tabs value={view} onValueChange={(value) => setView(value as typeof view)}>
        <TabsList variant="line" aria-label={`${entry.title} view`} className="w-full justify-start border-b">
          <TabsTrigger value="preview" className="flex-none px-3">Preview</TabsTrigger>
          <TabsTrigger value="source" className="flex-none px-3">Source</TabsTrigger>
        </TabsList>
        <div className="bg-card shadow-surface relative mt-3 grid min-h-56 overflow-hidden rounded-lg">
          {/* The live preview stays mounted behind the source so its state survives the switch. */}
          <div
            className={cn(
              "flex items-center justify-center p-6 sm:p-10",
              showingSource && "invisible"
            )}
            aria-hidden={showingSource || undefined}
            inert={showingSource}
          >
            {children}
          </div>
          {showingSource ? (
            <div className="bg-card absolute inset-0 overflow-auto">
              <CodeSnippet
                code={sources.source.code}
                html={sources.source.html}
                label={`${entry.id}.tsx`}
                className="rounded-none shadow-none"
              />
            </div>
          ) : null}
        </div>
      </Tabs>

      <Tabs defaultValue="install">
        <TabsList variant="line" aria-label={`${entry.title} code`} className="w-full justify-start border-b">
          <TabsTrigger value="install" className="flex-none px-3">Install</TabsTrigger>
          <TabsTrigger value="import" className="flex-none px-3">Import</TabsTrigger>
        </TabsList>
        <TabsContent value="install" className="pt-3">
          <CodeSnippet
            code={sources.install.code}
            html={sources.install.html}
            label={`Install ${entry.title}`}
            kind="terminal"
          />
        </TabsContent>
        <TabsContent value="import" className="pt-3">
          <CodeSnippet
            code={sources.import.code}
            html={sources.import.html}
            label={`Import ${entry.title}`}
          />
        </TabsContent>
      </Tabs>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
        <span className="text-muted-foreground">Supported states</span>
        <ul aria-label={`${entry.title} supported states`} className="flex flex-wrap gap-1.5">
          {entry.states.map((state) => (
            <li key={state} className="text-muted-foreground rounded-sm bg-muted px-1.5 py-0.5 font-mono">
              {state}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}

export { ComponentCard }
