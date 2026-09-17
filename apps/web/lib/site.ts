export type Direction = "ltr" | "rtl"

export const site = {
  name: "typesafe-ui",
  description: "shadcn-style reusable components and blocks for using TypeSafe AI.",
  /** BCP 47 language tag applied to <html lang>. */
  lang: "en",
  /** Text direction applied to <html dir> and the DirectionProvider. Flip to "rtl" for RTL locales. */
  dir: "ltr" as Direction,
} as const
