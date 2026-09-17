"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

function subscribeNoop() {
  return () => {}
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // next-themes only knows the resolved theme on the client. Render dark until then.
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  const dark = mounted ? resolvedTheme === "dark" : true
  const label = dark ? "Use light scheme" : "Use dark scheme"

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            onClick={() => setTheme(dark ? "light" : "dark")}
          />
        }
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </TooltipTrigger>
      <TooltipContent>
        {label} <kbd className="ms-1 font-mono text-[10px] opacity-70">D</kbd>
      </TooltipContent>
    </Tooltip>
  )
}

export { ThemeToggle }
