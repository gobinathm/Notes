import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tech Certification Study Notes",
  description: "Comprehensive study notes for various technology certifications",

  // Clean URLs without .html extension
  cleanUrls: true,

  // SEO: Enable sitemap generation
  sitemap: {
    hostname: 'https://notes.gobinath.com'
  },

  // Head tags for SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'Tech Certification Study Notes' }],
    ['meta', { property: 'og:image', content: 'https://notes.gobinath.com/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Tech Certification Study Notes - Your journey to certification success' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://notes.gobinath.com/og-image.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'Tech Certification Study Notes - Your journey to certification success' }],

    // Umami Analytics (Privacy-First)
    ['script', {
      defer: '',
      src: 'https://cloud.umami.is/script.js',
      'data-website-id': '52b95d7a-5cf9-4278-a601-63b61c782c1f'
    }]
  ],

  themeConfig: {
    // Logo and site title
    logo: '/logo.svg',
    siteTitle: 'Study Notes',

    // Navigation
    nav: [
      { text: 'Home', link: 'https://gobinath.com' },
      {
        text: 'Certifications',
        items: [
          { text: 'All Certifications', link: '/certifications/' },
          { text: 'GH-200: GitHub Actions', link: '/certifications/github/gh-actions/' },
          { text: 'CLF-C02: AWS Cloud Practitioner', link: '/certifications/aws/clf-c02/' },
          { text: 'AIF-C01: AWS AI Practitioner', link: '/certifications/aws/aif-c01/' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'About', link: '/resources/about' },
          { text: 'Study Tips', link: '/resources/study-tips' },
          { text: 'Exam Strategies', link: '/resources/exam-strategies' },
          { text: 'Certificate Tracking', link: '/resources/certificate-tracking' }
        ]
      }
    ],

    // Sidebar navigation
    sidebar: {
      '/certifications/': [
        {
          text: 'GitHub Certifications',
          collapsed: false,
          items: [
            {
              text: 'GH-200: GitHub Actions',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/certifications/github/gh-actions/' },
                { text: 'Exam Objectives', link: '/certifications/github/gh-actions/objectives' },
                { text: 'Study Notes', link: '/certifications/github/gh-actions/notes' },
                { text: 'Quick Refresher', link: '/certifications/github/gh-actions/quick-refresher' },
                { text: 'Exam Tips', link: '/certifications/github/gh-actions/exam-tips' }
              ]
            }
          ]
        },
        {
          text: 'AWS Certifications',
          collapsed: false,
          items: [
            {
              text: 'CLF-C02: Cloud Practitioner',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/certifications/aws/clf-c02/' },
                { text: 'Exam Objectives', link: '/certifications/aws/clf-c02/objectives' },
                { text: 'Study Notes', link: '/certifications/aws/clf-c02/notes' },
                { text: 'Exam Tips', link: '/certifications/aws/clf-c02/exam-tips' }
              ]
            },
            {
              text: 'AIF-C01: AI Practitioner',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/certifications/aws/aif-c01/' },
                { text: 'Exam Objectives', link: '/certifications/aws/aif-c01/objectives' },
                { text: 'Study Notes', link: '/certifications/aws/aif-c01/notes' },
                { text: 'Quick Refresher', link: '/certifications/aws/aif-c01/quick-refresher' },
                { text: 'Exam Tips', link: '/certifications/aws/aif-c01/exam-tips' }
              ]
            }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Study Resources',
          items: [
            { text: 'About', link: '/resources/about' },
            { text: 'Study Tips', link: '/resources/study-tips' },
            { text: 'Exam Strategies', link: '/resources/exam-strategies' },
            { text: 'Certificate Tracking', link: '/resources/certificate-tracking' }
          ]
        }
      ]
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gobinathm/Notes' }
    ],

    // Footer
    footer: {
      message: 'Happy Studying! 🚀 • We use privacy-friendly analytics (no cookies, no personal data) • <a href="/privacy">Privacy Policy</a>',
      copyright: 'Made with ❤️ and too much ☕ by Gobi • <a href="https://github.com/gobinathm/Notes/issues" target="_blank">Report an issue</a>'
    },

    // Search
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/gobinathm/Notes/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

  },

  // Markdown configuration
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // Vue configuration - prevent processing of GitHub Actions syntax
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('${{')
      }
    }
  }
})
