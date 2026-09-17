import type { Metadata } from "next"

import { Lab } from "@/components/lab"

export const metadata: Metadata = {
  title: "Lab",
  description: "Interactive scenes built from the TypeSafe UI library.",
}

export default function LabPage() {
  return <Lab />
}
