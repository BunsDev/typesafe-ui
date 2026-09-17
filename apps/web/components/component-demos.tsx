"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SettingsIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"

function DemoSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  )
}

function CardDemo() {
  return (
    <DemoSection
      title="Card"
      description="Header, action slot, content, and footer. The second card uses the compact size."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>
              Manage how this project is built and deployed.
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More options">
                <MoreHorizontalIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium">Project name</span>
              <Input defaultValue="typesafe-ui" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium">Root directory</span>
              <Input defaultValue="apps/web" />
            </label>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Requests this billing period.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">12,480</p>
            <p className="text-muted-foreground text-xs">of 50,000 included</p>
          </CardContent>
        </Card>
      </div>
    </DemoSection>
  )
}

function InputDemo() {
  const [value, setValue] = React.useState("")
  const invalid = value.length > 0 && !value.includes("@")

  return (
    <DemoSection
      title="Input"
      description="Default, controlled with validation, disabled, and file inputs."
    >
      <div className="grid max-w-md gap-3">
        <Input placeholder="Search components…" />
        <div className="flex flex-col gap-1.5">
          <Input
            type="email"
            placeholder="you@example.com"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-invalid={invalid || undefined}
          />
          {invalid ? (
            <p className="text-destructive text-xs">
              Enter a valid email address.
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              Type without an @ to see the invalid state.
            </p>
          )}
        </div>
        <Input placeholder="Disabled" disabled />
        <Input type="file" />
      </div>
    </DemoSection>
  )
}

function DialogDemo() {
  return (
    <DemoSection
      title="Dialog"
      description="A modal with a form and a footer. Press Escape or click outside to close."
    >
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium">Name</span>
                <Input defaultValue="Val Alexander" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium">Username</span>
                <Input defaultValue="@buns" />
              </label>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button />}>Save changes</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="destructive" />}>
            Delete project
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Delete this project?</DialogTitle>
              <DialogDescription>
                This permanently removes the project and its deployments. This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Keep project
              </DialogClose>
              <DialogClose render={<Button variant="destructive" />}>
                Delete
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DemoSection>
  )
}

function DropdownMenuDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showPanel, setShowPanel] = React.useState(false)
  const [density, setDensity] = React.useState("comfortable")

  return (
    <DemoSection
      title="Dropdown menu"
      description="Groups, shortcuts, a submenu, checkbox items, and a radio group."
    >
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <UserIcon data-icon="inline-start" />
            Account
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CopyIcon />
                Copy link
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Public link</DropdownMenuItem>
                <DropdownMenuItem>Team link</DropdownMenuItem>
                <DropdownMenuItem>Embed code</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <PencilIcon />
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Side panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">
                Comfortable
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="spacious">
                Spacious
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-muted-foreground flex items-center gap-1.5 self-center font-mono text-xs">
          <CheckIcon className="size-3.5" />
          {[showStatusBar && "status bar", showPanel && "side panel"]
            .filter(Boolean)
            .join(", ") || "nothing"}{" "}
          · {density}
        </p>
      </div>
    </DemoSection>
  )
}

export function ComponentDemos() {
  return (
    <div className="flex flex-col gap-12">
      <CardDemo />
      <InputDemo />
      <DialogDemo />
      <DropdownMenuDemo />
    </div>
  )
}
