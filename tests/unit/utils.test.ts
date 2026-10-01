import { describe, expect, test } from "vitest";

import { removeStyleField } from "../../src/component-docs/shared/blockDataUtils";
import {
  kebabToTitleCase,
  pascalToKebab,
  toKebabCase,
  toPascalCase,
} from "../../src/component-docs/shared/caseUtils";
import { getChildComponentPath } from "../../src/component-docs/shared/componentPath";
import { pascalToKebab as pascalToKebabForCloudCannon } from "../../src/components/utils/pascalToKebab";
import { slugifyLabel } from "../../src/components/utils/slugify";

describe("slugifyLabel", () => {
  test.each([
    ["Hello World", "hello-world"],
    ["  Leading and trailing  ", "leading-and-trailing"],
    ["Starlight Plugins & Themes!", "starlight-plugins-themes"],
    ["already-a-slug", "already-a-slug"],
    ["Ünïcode", "n-code"],
    ["", ""],
  ])("turns %j into %j", (label, expected) => {
    expect(slugifyLabel(label)).toBe(expected);
  });
});

describe("case conversion", () => {
  test.each([
    ["ListItem", "list-item"],
    ["Button", "button"],
    ["HTMLEmbed", "htmlembed"],
  ])("toKebabCase(%j) is %j", (name, expected) => {
    expect(toKebabCase(name)).toBe(expected);
  });

  test.each([
    ["ListItem", "list-item"],
    ["Button", "button"],
    ["HTMLEmbed", "h-t-m-l-embed"],
  ])("pascalToKebab(%j) is %j", (name, expected) => {
    expect(pascalToKebab(name)).toBe(expected);
    expect(pascalToKebabForCloudCannon(name)).toBe(expected);
  });

  test.each([
    ["list-item", "ListItem"],
    ["button", "Button"],
    ["", ""],
  ])("toPascalCase(%j) is %j", (name, expected) => {
    expect(toPascalCase(name)).toBe(expected);
  });

  test("converts kebab case to a title", () => {
    expect(kebabToTitleCase("foo-bar-baz")).toBe("Foo Bar Baz");
  });

  test("round-trips pascal and kebab case for simple names", () => {
    expect(toPascalCase(toKebabCase("SplitSection"))).toBe("SplitSection");
  });
});

describe("getChildComponentPath", () => {
  test("appends the kebab-cased child to its parent", () => {
    expect(getChildComponentPath("typography/list", "ListItem")).toBe("typography/list/list-item");
  });
});

describe("removeStyleField", () => {
  test("removes style fields at every depth", () => {
    expect(
      removeStyleField({
        style: "a",
        title: "Hello",
        items: [{ style: "b", text: "Item", nested: { style: "c", keep: 1 } }],
      })
    ).toEqual({ title: "Hello", items: [{ text: "Item", nested: { keep: 1 } }] });
  });

  test("keeps primitives and null as they are", () => {
    expect(removeStyleField("text")).toBe("text");
    expect(removeStyleField(null)).toBeNull();
    expect(removeStyleField(3)).toBe(3);
  });

  test("does not change the input", () => {
    const input = { style: "a", value: 1 };

    removeStyleField(input);

    expect(input).toEqual({ style: "a", value: 1 });
  });
});
