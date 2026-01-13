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
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Tech Certification Study Notes' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
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
      { icon: 'github', link: 'https://github.com/yourusername/Notes' }
    ],

    // Footer
    footer: {
      message: 'Study notes for personal learning and exam preparation',
      copyright: 'Copyright © 2026-present'
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
      pattern: 'https://github.com/yourusername/Notes/edit/main/:path',
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
