import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Use proxy base URL in development if PROXY_BASE_URL is set
const baseUrl = process.env.PROXY_BASE_URL || "/documentation-site/";
const url = process.env.SITE_URL || "https://vanvonlj.github.io";

const config: Config = {
  title: "Documentation Hub",
  tagline: "Complete documentation for all projects",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "vanvonlj", // Usually your GitHub org/user name.
  projectName: "documentation-site", // Usually your repo name.

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "text-rpg",
        path: "docs-text-rpg",
        routeBasePath: "text-rpg",
        sidebarPath: "./sidebars-text-rpg.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "distiller",
        path: "docs-distiller",
        routeBasePath: "distiller",
        sidebarPath: "./sidebars-distiller.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "homelab",
        path: "docs-homelab",
        routeBasePath: "homelab",
        sidebarPath: "./sidebars-homelab.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "gaming",
        path: "docs-gaming",
        routeBasePath: "gaming",
        sidebarPath: "./sidebars-gaming.ts",
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: false, // Disable default docs
        blog: false, // Disable blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Docs Hub",
      logo: {
        alt: "Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "dropdown",
          label: "Text RPG",
          position: "left",
          items: [
            {
              label: "Overview",
              to: "/text-rpg/intro",
            },
            {
              label: "Developer Docs",
              to: "/text-rpg/developer/overview",
            },
            {
              label: "Admin Guides",
              to: "/text-rpg/admin/overview",
            },
          ],
        },
        {
          type: "dropdown",
          label: "Distiller",
          position: "left",
          items: [
            {
              label: "Overview",
              to: "/distiller/intro",
            },
            {
              label: "Skills",
              to: "/distiller/skills/overview",
            },
            {
              label: "Cloning Distiller OS",
              to: "/distiller/guides/cloning-distiller-os",
            },
            {
              label: "UART IP Reset",
              to: "/distiller/guides/uart-ip-reset",
            },
          ],
        },
        {
          type: "dropdown",
          label: "HomeLab",
          position: "left",
          items: [
            {
              label: "Overview",
              to: "/homelab/intro",
            },
            {
              label: "Hardware",
              to: "/homelab/hardware/intro",
            },
            {
              label: "Proxmox",
              to: "/homelab/proxmox/installation",
            },
            {
              label: "K3s",
              to: "/homelab/k8s/k3s/getting-started",
            },
            {
              label: "RKE2",
              to: "/homelab/k8s/rke2/getting-started",
            },
          ],
        },
        {
          type: "dropdown",
          label: "Gaming",
          position: "left",
          items: [
            {
              label: "Overview",
              to: "/gaming/intro",
            },
            {
              label: "Diablo IV",
              to: "/gaming/diablo-iv/intro",
            },
            {
              label: "Turtle WoW",
              to: "/gaming/turtle-wow/intro",
            },
            {
              label: "WoW Retail",
              to: "/gaming/wow-retail/intro",
            },
          ],
        },
        {
          href: "https://github.com/vanvonlj/documentation-site",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Text RPG",
          items: [
            {
              label: "Developer Docs",
              to: "/text-rpg/developer/overview",
            },
            {
              label: "Admin Guides",
              to: "/text-rpg/admin/overview",
            },
          ],
        },
        {
          title: "Distiller",
          items: [
            {
              label: "Skills Overview",
              to: "/distiller/skills/overview",
            },
            {
              label: "Cloning Distiller OS",
              to: "/distiller/guides/cloning-distiller-os",
            },
            {
              label: "UART Guide",
              to: "/distiller/guides/uart-ip-reset",
            },
          ],
        },
        {
          title: "HomeLab",
          items: [
            {
              label: "Hardware",
              to: "/homelab/hardware/intro",
            },
            {
              label: "Proxmox",
              to: "/homelab/proxmox/installation",
            },
            {
              label: "Kubernetes",
              to: "/homelab/k8s/k3s/getting-started",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/vanvonlj/documentation-site",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Your Projects. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "typescript", "python"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
