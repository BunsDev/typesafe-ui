"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BoxesIcon,
  ExternalLinkIcon,
  FlaskConicalIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"

import { groups, registry } from "@/lib/registry"
import { site } from "@/lib/site"

function SearchCommand({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function run(action: () => void) {
    setOpen(false)
    action()
  }

  return (
    <>
      <Button
        variant="outline"
        className={className}
        onClick={() => setOpen(true)}
        aria-label="Search components"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <SearchIcon data-icon="inline-start" className="text-muted-foreground" />
        <span className="text-muted-foreground flex-1 text-start font-normal">
          Search components…
        </span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Jump to a component or page."
      >
        <CommandInput placeholder="Type a component or page…" />
        <CommandList>
          <CommandEmpty>No matches. Try “dialog” or “select”.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="Library overview" onSelect={() => run(() => router.push("/"))}>
              <BoxesIcon />
              Library
            </CommandItem>
            <CommandItem value="Lab scenes" onSelect={() => run(() => router.push("/lab"))}>
              <FlaskConicalIcon />
              Lab
            </CommandItem>
          </CommandGroup>
          {groups.map((group) => (
            <CommandGroup heading={group} key={group}>
              {registry
                .filter((entry) => entry.group === group)
                .map((entry) => (
                  <CommandItem
                    key={entry.id}
                    value={`${entry.title} ${entry.description}`}
                    onSelect={() => run(() => router.push(`/#${entry.id}`))}
                  >
                    {entry.title}
                    <CommandShortcut className="font-mono">{entry.id}</CommandShortcut>
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              value="Toggle theme scheme"
              onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            >
              {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
              Toggle theme
              <CommandShortcut>D</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="GitHub repository"
              onSelect={() => run(() => window.open(site.links.github, "_blank", "noopener"))}
            >
              <ExternalLinkIcon />
              Open GitHub
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { SearchCommand }
