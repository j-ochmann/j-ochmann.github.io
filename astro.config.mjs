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
    title: 'DevBook',
    customCss: ['./src/styles/globals.scss'],
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/j-ochmann' }
    ],
    components: {
      // Header: './src/components/starlight/Header.astro',
      Sidebar: './src/components/starlight/Sidebar.astro'
    },
    sidebar: [
      {
        label: 'Quick Reference',
        autogenerate: { directory: 'quick_reference' },
        collapsed: true,
      },
      // {
      //   label: 'Design Patterns',
      //   autogenerate: { directory: 'design_patterns' },
      // },
      {
        label: 'Design Patterns',
        collapsed: true,
        //link: '/design_patterns/',
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
        link: '/external_resources/',
      },
      {
        label: '3D Graph Example',
        link: '/3d-graph-example/',
      },
      {
        label: 'Artificial Intelligence',
        link: '/ai/',
      },
      {
        label: 'Courses',
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