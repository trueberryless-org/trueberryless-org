# trueberryless-org 🚂

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ef82cd33-cb29-4d86-909c-71798c49ee16/deploy-status)](https://app.netlify.com/projects/trueberryless-org/deploys)

Welcome to the central station of the **trueberryless-org** ecosystem. This repository powers our official landing page and serves as a showcase for our specialized Starlight plugins, modular themes, and technical infrastructure.

Originally built to manage complex deployments on Rocky Linux via ArgoCD, this project has evolved into a streamlined, open-source hub. By migrating our pipeline to **Netlify**, we’ve moved away from manual server management and complex manifest files in favor of a high-velocity, automated track.

## Built with Astro

The site is a plain [Astro](https://astro.build) site. The landing page is `src/pages/index.astro`, which renders the sections of the "train" theme (`src/components/page-sections/train/`) with the content from `src/data/home.ts`. The look is driven by CSS variables in `src/styles/`, so the theme can be changed without touching the components.

Earlier versions were built with the CloudCannon component starter. The visual editor, the component library with its builder and the generic block renderer are gone, the components that the page does not use were removed, and the content moved from front matter to a typed data file.

- **Starlight integration:** the page links to our fleet of Starlight plugins.
- **Automated sync:** standardized workflows and configuration across the organization are managed by the `template-files` repository.

## Quick start

```bash
git clone https://github.com/trueberryless-org/trueberryless-org
pnpm install
pnpm dev
```

The site runs at `http://localhost:4321`.

## Project structure

```
src/
├── components/
│   ├── building-blocks/  # buttons, headings, icons, images, text
│   ├── navigation/       # main navigation, mobile menu, footer
│   └── page-sections/    # the train sections of the landing page
├── data/                 # landing page content, navigation, footer, SEO
├── layouts/              # base layout and page layout
├── pages/                # index.astro
└── styles/               # design tokens and themes
```

## Commands

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `pnpm dev`          | Start the development server                         |
| `pnpm build`        | Production build                                     |
| `pnpm check`        | Sync the Astro types                                 |
| `pnpm lint`         | Lint scripts with oxlint and styles with stylelint   |
| `pnpm format:check` | Check formatting with Prettier                       |
| `pnpm knip`         | Find unused files and dependencies                   |
| `pnpm test`         | Unit tests with Vitest                               |
| `pnpm test:e2e`     | Build, then run the Playwright end-to-end tests      |

## 🤝 Contributions & Maintenance

This organization is maintained by [trueberryless](https://felixs.dev). We are always looking for contributors to help maintain and scale our ecosystem. Whether you are fixing a bug in a Starlight plugin or improving a component wagon, your help keeps this project on the right track.

## License

Licensed under the MIT license, Copyright © trueberryless.

See [LICENSE](https://github.com/trueberryless-org/trueberryless-org/blob/main/LICENSE) for more information.
