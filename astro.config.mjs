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
      en: { lang: 'en', label: 'English' },   // English  1.500
      cs: { lang: 'cs', label: 'Čeština'},    // Czech
      sk: { lang: 'sk', label: 'Slovenčina'}, // Slovak
      pl: { lang: 'pl', label: 'Polski'},     // Polish
      uk: { lang: 'uk', label: 'Українська'}, // Ukrainian
      ru: { lang: 'ru', label: 'Русский'},    // Russian  150
      de: { lang: 'de', label: 'Deutsch'},    // German
      fr: { lang: 'fr', label: 'Français'},   // French   280
      it: { lang: 'it', label: 'Italiano'},   // Italian
      nl: { lang: 'nl', label: 'Nederlands'}, // Dutch
      fi: { lang: 'fi', label: 'Suomi'},      // Finnish
      no: { lang: 'no', label: 'Norsk'},      // Norwegian
      sv: { lang: 'sv', label: 'Svenska'},    // Swedish
      es: { lang: 'es', label: 'Español'},    // Spanish    550
      pt: { lang: 'pt', label: 'Português'},  // Portuguese 219
      tr: { lang: 'tr', label: 'Türkçe'},     // Turkish
      el: { lang: 'el', label: 'Ελληνικά'},   // Greek
      zh: { lang: 'zh', label: '简体中文'},    // Chinese   1.100
      ja: { lang: 'ja', label: '日本語'},      // Japanese
      ko: { lang: 'ko', label: '한국어'},      // Korean
      hi: { lang: 'hi', label: 'हिन्दी'},        // Hindi       600
      ar: { lang: 'ar', label: 'العربية'},      // Arabic       350
      he: { lang: 'he', label: 'עברית'},       // Hebrew
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
        collapsed: true,
        items: [
          {
            label: 'Countries',
            translations: { cs: 'Země' },
            link: '/countries/',
          },
          {
            label: 'Languages',
            translations: { cs: 'Jazyky' },
            link: '/languages/',
          },
          {
            label: 'Currencies',
            translations: { cs: 'Měny' },
            link: '/currencies/',
          },
          {
            label: 'Flags',
            translations: { cs: 'Vlajky' },
            link: '/flags/',
          },
        ]

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