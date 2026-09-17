import type { Metadata } from "next"
import Link from "next/link"

import { ComponentDemos } from "@/components/component-demos"

export const metadata: Metadata = {
  title: "Components",
  description: "Live examples of the shared @workspace/ui components.",
}

export default function DemoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 p-6 sm:p-10">
      <header className="flex flex-col gap-2">
        <Link
          href="/"
          className="text-muted-foreground w-fit text-xs hover:underline"
        >
          ← Home
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
        <p className="text-muted-foreground text-sm">
          Live examples of the shared{" "}
          <code className="font-mono text-xs">@workspace/ui</code> components.
          Press <kbd className="font-mono text-xs">d</kbd> to toggle dark mode.
        </p>
      </header>
      <ComponentDemos />
    </main>
  )
}
