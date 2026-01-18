import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from 'rehype-mermaid';
import d2 from 'astro-d2'; // Předpokládá se instalace integrace
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url'; // Importujte pro práci s cestami

export default defineConfig({
  site: 'https://j-ochmann.github.io',
  base: '/', 

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'd2'],
    },
    rehypePlugins: [
      [rehypeMermaid, {
          strategy: 'img-svg',
          mermaidConfig: {
            theme: 'default', 
          },
          dark: false 
        }
      ],
    ]
  },
  integrations: [
    react(),
    d2(),
    starlight({
    title: 'Jindřich Ochmann - Software Engineer',
    customCss: ['./src/styles/globals.scss'],
    locales: { root: { lang: 'en', label: 'English' },
                 cs: { lang: 'cs',
                       label: 'Čeština', 
                         sidebar: [
                           { label: 'Kurzy', link: '/cs/courses/', badge: { text: 'zdarma', variant: 'success' } },
                         ],
                 },
    },
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/j-ochmann' }
    ],
    components: {
      ThemeSelect: './src/components/starlight/ThemeSelect.astro',
      //LanguageSelect: './src/components/starlight/LanguageSelect.astro',
      Header: './src/components/starlight/Empty.astro',
      RightSidebar: './src/components/starlight/Empty.astro',
      MobileTableOfContents: './src/components/starlight/Empty.astro',
      Sidebar: './src/components/starlight/Sidebar.astro'
    },
    sidebar: [
      {
        label: 'Quick Reference',
        translations: { cs: 'Kvintesence' },
        autogenerate: { directory: 'quick_reference' },
        collapsed: true,
      },
      {
        label: 'Design Patterns',
        translations: { cs: 'Návrhové vzory' },
        collapsed: true,
        items: [
          { 
            label: 'Overview',
            link: '/design_patterns/',
          },
          {
            label: 'Creational',
            autogenerate: { directory: 'design_patterns/creational/' },
            collapsed: true, 
          },
          { label: 'Structural',
            autogenerate: { directory: 'design_patterns/structural/' },
            collapsed: true,
          },
          { label: 'Behavioral',
            autogenerate: { directory: 'design_patterns/behavioral' },
            collapsed: true,
          },
        ],
      },
      {
        label: 'External Resources',
        translations: { cs: 'Externí materiály' },
        link: '/external_resources/',
      },
      {
        label: '3D Graph Example',
        translations: { cs: '3D graf ukázka' },
        link: '/3d-graph-example/',
      },
      {
        label: 'Artificial Intelligence',
        translations: { cs: 'Umělá inteligence' },
        link: '/ai/',
      },
      {
        label: 'Courses',
        translations: { cs: 'Kurzy' },
        link: '/courses/',
        badge: 'Free',
      },
    ],
  })],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});