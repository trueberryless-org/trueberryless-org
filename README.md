# trueberryless-org 🚂

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ef82cd33-cb29-4d86-909c-71798c49ee16/deploy-status)](https://app.netlify.com/projects/trueberryless-org/deploys)

Welcome to the central station of the **trueberryless-org** ecosystem. This repository powers our official landing page and serves as a showcase for our specialized Starlight plugins, modular themes, and technical infrastructure.

Originally built to manage complex deployments on Rocky Linux via ArgoCD, this project has evolved into a streamlined, open-source hub. By migrating our pipeline to **Netlify**, we’ve moved away from manual server management and complex manifest files in favor of a high-velocity, automated track.

## 🛠 Built with Purpose

This site is built using a highly customized version of the **Astro Component Starter**. It leverages a modular "train-and-wagon" architecture where every UI element is engineered for momentum and visual editing via [CloudCannon](https://cloudcannon.com/).

### Key Engineering Features:

- **Starlight Integration:** Seamlessly connects to our fleet of Starlight plugins.
- **Automated Sync:** Managed via our `template-files` engine to ensure standardized workflows and configurations across the org.
- **Unbranded Foundation:** While the theme is currently "Train-focused," the underlying system is built on CSS variables, allowing for rapid identity shifts.

## 🚀 Quick Start

To get this "locomotive" running locally:

```bash
# Clone the repository
git clone https://github.com/trueberryless-org/trueberryless-org

# Install dependencies
pnpm install

# Start the engine
pnpm dev
```

Your site is now running at `http://localhost:4321`.

**Component Docs:** Access the visual builder and documentation at `http://localhost:4321/component-docs/`.

## 📦 The Blueprint

We follow the **Three-File Pattern**, ensuring that developers keep control of the code while editors can visually manage content.

```
src/components/.../train-hero/
├── TrainHero.astro                   # The locomotive (Logic/Markup)
├── train-hero.cloudcannon.inputs.yml # The control panel (Editor inputs)
└── train-hero.cloudcannon.structure-value.yml # The manifest (Defaults)
```

### Directory Map

```
src/
├── components/          # 40+ modular wagons (Hero, Features, Projects)
│   ├── building-blocks/ # Core UI: buttons, headings, layout
│   └── page-sections/   # Full-width train sections
├── content/             # Markdown-driven pages and blog posts
├── styles/              # Design tokens and theme variables
└── component-docs/      # Built-in visual component library
```

## 🛠 Dev and Build Commands

| Command                      | Description                                |
| ---------------------------- | ------------------------------------------ |
| `pnpm dev`                   | Start the development server               |
| `pnpm build`                 | Production build (Excludes component docs) |
| `pnpm build:with-library` | Production build (Includes component docs) |

### Quality checks

| Command             | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `pnpm check`        | Sync content collections and validate them against their schemas         |
| `pnpm lint`         | Lint scripts with oxlint and styles with stylelint                       |
| `pnpm format:check` | Check formatting with Prettier                                           |
| `pnpm knip`         | Find unused files and dependencies                                       |
| `pnpm test`         | Unit tests with Vitest                                                   |
| `pnpm test:e2e`     | Build, then run the Playwright end-to-end tests against the landing page |


## 🤝 Contributions & Maintenance

This organization is maintained by [trueberryless](https://felixs.dev). We are always looking for contributors to help maintain and scale our ecosystem. Whether you are fixing a bug in a Starlight plugin or improving a component wagon, your help keeps this project on the right track.

## License

Licensed under the MIT license, Copyright © trueberryless.

See [LICENSE](https://github.com/trueberryless-org/trueberryless-org/blob/main/LICENSE) for more information.
