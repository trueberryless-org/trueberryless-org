import { describe, expect, test } from "vitest";

import { slugifyLabel } from "../../src/components/utils/slugify";

describe("slugifyLabel", () => {
  test.each([
    ["Hello World", "hello-world"],
    ["  Leading and trailing  ", "leading-and-trailing"],
    ["Starlight Plugins & Themes!", "starlight-plugins-themes"],
    ["already-a-slug", "already-a-slug"],
    ["", ""],
  ])("turns %j into %j", (label, expected) => {
    expect(slugifyLabel(label)).toBe(expected);
  });
});
