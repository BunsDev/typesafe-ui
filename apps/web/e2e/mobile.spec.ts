import { expect, horizontalOverflow, test } from "./fixtures"

test.describe("mobile", () => {
  test("pages never scroll sideways", async ({ page }) => {
    await page.goto("/")
    expect(await horizontalOverflow(page)).toBe(0)
    await page.goto("/lab")
    expect(await horizontalOverflow(page)).toBe(0)
  })

  test("the header stays on one line with a compact search", async ({
    page,
  }) => {
    await page.goto("/")
    const header = page.getByRole("banner")
    const box = await header.boundingBox()
    expect(box?.height ?? 0).toBeLessThanOrEqual(56)
    await header.getByRole("button", { name: "Search components" }).click()
    await expect(page.getByRole("dialog", { name: "Search" })).toBeVisible()
  })

  test("the navigation sheet opens and navigates", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Open navigation" }).click()
    const sheet = page.getByRole("dialog")
    await expect(sheet).toBeVisible()
    await sheet.getByRole("link", { name: "Lab", exact: true }).click()
    await expect(page).toHaveURL(/\/lab$/)
    await expect(sheet).toBeHidden()
    await expect(
      page.getByRole("heading", { level: 1, name: "Component lab" })
    ).toBeVisible()
  })
})
