import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has a title and one main heading", async ({ page }) => {
    await expect(page).toHaveTitle("trueberryless-org");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("shows all sections", async ({ page }) => {
    for (const name of [
      "Organized for Momentum",
      "Built to Pull",
      "Featured Projects",
      "Tracking Progress",
      "Ready to Board?",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeAttached();
    }
  });

  test("has canonical and Open Graph metadata", async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
      "href",
      "https://trueberryless-org.trueberryless.org/"
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://trueberryless-org.trueberryless.org/og-image.png"
    );
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.svg");
  });

  test("does not scroll horizontally", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("has no accessibility violations", async ({ page }) => {
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(
      violations.map(
        ({ id, nodes }) => `${id}: ${nodes.map(({ target }) => target.join(" ")).join(", ")}`
      )
    ).toEqual([]);
  });
});
