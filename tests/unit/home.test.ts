import { describe, expect, test } from "vitest";

import footer from "../../src/data/footer.json";
import { about, community, cta, features, hero, projects } from "../../src/data/home";
import mainNav from "../../src/data/mainNav.json";
import seo from "../../src/data/seo.json";

const buttons = [...hero.buttonSections, ...cta.buttonSections, ...mainNav.buttonSections];
const links = [
  ...buttons.map(({ link }) => link),
  ...features.features.map(({ link }) => link),
  ...projects.projects.map(({ link }) => link),
  ...footer.socials.map(({ link }) => link),
];

describe("landing page content", () => {
  test("has a heading and a text for every section", () => {
    for (const section of [hero, about, features, projects, community, cta]) {
      expect(section.heading.trim()).not.toBe("");
      expect(section.subtext.trim()).not.toBe("");
    }
  });

  test("links to secure external pages or to anchors on the page", () => {
    for (const link of links) {
      expect(link.startsWith("#") || new URL(link).protocol === "https:", link).toBe(true);
    }
  });

  test("links the navigation to sections that exist", () => {
    const ids = ["about", "features", "projects", "community"];

    expect(mainNav.navData.map(({ path }) => path.replace("/#", ""))).toEqual(ids);
    expect(footer.links.map(({ path }) => path.replace("/#", ""))).toEqual(ids);
  });

  test("lists the projects with their stars", () => {
    expect(projects.projects.length).toBeGreaterThan(0);

    for (const { name, stars } of projects.projects) {
      expect(name.trim()).not.toBe("");
      expect(Number(stars)).toBeGreaterThanOrEqual(0);
    }
  });

  test("describes the organization for search engines", () => {
    expect(new URL(seo.url).protocol).toBe("https:");
    expect(seo.ogImage).toBe("/og-image.png");
    expect(seo.description.length).toBeGreaterThan(20);
  });

  test("shows three statistics", () => {
    expect(community.stats).toHaveLength(3);
  });
});
