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
  redirects: {
    '/': '/en/',
  },
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
    favicon: '/favicon.png', 
    customCss: ['./src/styles/globals.scss'],
    head: [
        {
          tag: 'meta',
          attrs: {
            name: 'google-site-verification',
            content: 'Ckax2z86O63zqfKByYNbkFo2q0C-rmFhUQnvEZxo0qM',
          },
        },
    ],
    defaultLocale: 'en',
    locales: {
      en: { lang: 'en', label: 'English' },
      cs: { lang: 'cs', label: 'Čeština'},
      sk: { lang: 'sk', label: 'Slovenčina'},
      pl: { lang: 'pl', label: 'Polski'},
      uk: { lang: 'uk', label: 'Українська'},
      ru: { lang: 'ru', label: 'Русский'},
      de: { lang: 'de', label: 'Deutsch'},
      fr: { lang: 'fr', label: 'Français'},
      it: { lang: 'it', label: 'Italiano'},
      nl: { lang: 'nl', label: 'Nederlands'},
      fi: { lang: 'fi', label: 'Suomi'},
      no: { lang: 'no', label: 'Norsk'},
      sv: { lang: 'sv', label: 'Svenska'},
      es: { lang: 'es', label: 'Español'},
      pt: { lang: 'pt', label: 'Português'},
      tr: { lang: 'tr', label: 'Türkçe'},
      el: { lang: 'el', label: 'Ελληνικά'},
      zh: { lang: 'zh', label: '简体中文'},
      ja: { lang: 'ja', label: '日本語'},
      ko: { lang: 'ko', label: '한국어'},
      hi: { lang: 'hi', label: 'हिन्दी'},
      ar: { lang: 'ar', label: 'العربية'},
      he: { lang: 'he', label: 'עברית'},
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
        label: 'About Me',
        translations: { cs: 'O mě' },
        link: '/about/',
      },
      {
        label: 'Dev',
        translations: { cs: 'Dev' },
        collapsed: true,
        items: [
          {
            label: 'Quick Reference',
            translations: { cs: 'Taháky' },
            autogenerate: { directory: 'quick_reference' },
            collapsed: true,
          },
          {
            label: 'Tutorials',
            translations: { cs: 'Tutorialy' },
            autogenerate: { directory: 'tutorials' },
            collapsed: true,
          },
          {
            label: 'Design Patterns',
            translations: { cs: 'Návrhové vzory' },
            collapsed: true,
            items: [
              { 
                label: 'Overview',
                translations: { cs: 'Přehled' },
                link: '/design_patterns/',
              },
              {
                label: 'Creational',
                translations: { cs: 'Tvůrčí' },
                autogenerate: { directory: 'design_patterns/creational/' },
                collapsed: true, 
              },
              { label: 'Structural',
                translations: { cs: 'Strukturální' },
                autogenerate: { directory: 'design_patterns/structural/' },
                collapsed: true,
              },
              { label: 'Behavioral',
                translations: { cs: 'Behaviorální' },
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
            label: 'Courses',
            translations: { cs: 'Kurzy' },
            link: '/courses/',
            badge: 'Free',
          },
          {
            label: 'Artificial Intelligence',
            translations: { cs: 'Umělá inteligence' },
            link: '/ai/',
          },
          {
            label: '3D Graph Example',
            translations: { cs: 'Ukázka 3D grafu' },
            link: '/3d-graph-example/',
          }
        ],
      },
      {
        label: 'Geo',
        translations: { cs: 'Geo' },
        autogenerate: { directory: 'geo' },
        collapsed: true
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