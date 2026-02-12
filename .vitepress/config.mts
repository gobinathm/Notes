import { defineConfig } from 'vitepress'

const hostname = 'https://notes.gobinath.com'

export default defineConfig({
  title: "Tech Certification Study Notes",
  description: "Comprehensive study notes for various technology certifications",

  // Exclude repository files from VitePress processing
  srcExclude: ['**/README.md', '**/CONTRIBUTING.md', '**/ADDING_CERTIFICATIONS.md', '.templates/**/*.md'],

  // Clean URLs without .html extension
  cleanUrls: true,

  // SEO: Enable sitemap generation
  sitemap: {
    hostname
  },

  // SEO: Add canonical URL, Schema, and OG Images per page
  transformPageData(pageData) {
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])

    // Dynamic OG Image Logic
    let ogImage = 'https://notes.gobinath.com/og-image.png'; // Default

    if (pageData.relativePath.includes('certifications/')) {
      const certDir = pageData.relativePath.split('/').slice(0, -1).join('/');
      // Construct specific OG image URL
      // We assume the user creates og-image.png in the cert folder.
      ogImage = `https://notes.gobinath.com/${certDir.replace('index.md', '')}/og-image.png`.replace('//og', '/og');

      // Add Course Schema for Certification Index pages
      if (pageData.relativePath.endsWith('index.md')) {
        const courseSchema = {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": pageData.title,
          "description": pageData.description,
          "provider": {
            "@type": "Organization",
            "name": "Gobinath's Notes",
            "sameAs": "https://gobinath.com"
          }
        };
        pageData.frontmatter.head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(courseSchema)
        ]);
      }
    }

    // Inject the decided OG Image (prevents duplicates from global config)
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:image', content: ogImage }]
    );
  },

  // Head tags for SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'Tech Certification Study Notes' }],
    // Global OG Image handled dynamically in transformPageData to allow overrides
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Tech Certification Study Notes - Your journey to certification success' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image:alt', content: 'Tech Certification Study Notes - Your journey to certification success' }],

    // Website Schema (Global)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://notes.gobinath.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://notes.gobinath.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })],

    // Fonts — self-hosted (Inter bundled by VitePress, Dancing Script in /fonts/)
    ['link', { rel: 'preload', href: '/fonts/dancing-script-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],

    // Umami Analytics (Privacy-First)
    ['link', { rel: 'preconnect', href: 'https://api-gateway.umami.dev' }],
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
          {
            text: 'Microsoft',
            items: [
              { text: 'AB-730: AI Business Professional', link: '/certifications/azure/ab-730/' },
              { text: 'AB-731: AI Transformation Leader', link: '/certifications/azure/ab-731/' },
              { text: 'GH-200: GitHub Actions', link: '/certifications/github/gh-actions/' }
            ]
          },
          {
            text: 'AWS',
            items: [
              { text: 'MLA-C01: ML Engineer', link: '/certifications/aws/mla-c01/' },
              { text: 'AIF-C01: AI Practitioner', link: '/certifications/aws/aif-c01/' },
              { text: 'CLF-C02: Cloud Practitioner', link: '/certifications/aws/clf-c02/' }
            ]
          },
          {
            text: 'Google Cloud',
            items: [
              { text: 'GCP-GAIL: Generative AI Leader', link: '/certifications/google-cloud/gen-ai-leader/' }
            ]
          }
        ]
      },
      { text: 'Exam Playbook', link: '/resources/exam-prep-guide' }
    ],

    // Sidebar navigation
    sidebar: {
      '/certifications/': [
        {
          text: '📦 GitHub Certifications',
          collapsed: true,
          items: [
            {
              text: 'GH-200: GitHub Actions',
              collapsed: true,
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
          text: '☁️ AWS Certifications',
          collapsed: true,
          items: [
            {
              text: 'CLF-C02: Cloud Practitioner',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/aws/clf-c02/' },
                { text: 'Exam Objectives', link: '/certifications/aws/clf-c02/objectives' },
                { text: 'Study Notes', link: '/certifications/aws/clf-c02/notes' },
                { text: 'Exam Tips', link: '/certifications/aws/clf-c02/exam-tips' }
              ]
            },
            {
              text: 'AIF-C01: AI Practitioner',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/aws/aif-c01/' },
                { text: 'Domain 1: AI & ML Fundamentals', link: '/certifications/aws/aif-c01/domain-1' },
                { text: 'Domain 2: Generative AI', link: '/certifications/aws/aif-c01/domain-2' },
                { text: 'Domain 3: Foundation Models', link: '/certifications/aws/aif-c01/domain-3' },
                { text: 'Domain 4: Responsible AI', link: '/certifications/aws/aif-c01/domain-4' },
                { text: 'Domain 5: Security & Governance', link: '/certifications/aws/aif-c01/domain-5' },
                { text: 'Exam Guide', link: '/certifications/aws/aif-c01/exam-guide' },
                { text: 'Cheatsheet', link: '/certifications/aws/aif-c01/cheatsheet' },
                { text: 'Exam Tips', link: '/certifications/aws/aif-c01/exam-tips' }
              ]
            },
            {
              text: 'MLA-C01: ML Engineer Associate',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/aws/mla-c01/' },
                { text: 'Exam Objectives', link: '/certifications/aws/mla-c01/objectives' },
                { text: 'Resources', link: '/certifications/aws/mla-c01/resources' }
              ]
            }
          ]
        },
        {
          text: '💎 Azure Certifications',
          collapsed: true,
          items: [
            {
              text: 'AB-730: AI Business Professional',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/azure/ab-730/' },
                { text: 'Domain 1: Fundamentals', link: '/certifications/azure/ab-730/domain-1' },
                { text: 'Domain 2: Prompts', link: '/certifications/azure/ab-730/domain-2' },
                { text: 'Domain 3: Content', link: '/certifications/azure/ab-730/domain-3' },
                { text: 'Exam Guide', link: '/certifications/azure/ab-730/exam-guide' },
                { text: 'Cheatsheet', link: '/certifications/azure/ab-730/cheatsheet' }
              ]
            },
            {
              text: 'AB-731: AI Transformation Leader',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/azure/ab-731/' },
                { text: 'Domain 1: Business Value', link: '/certifications/azure/ab-731/domain-1' },
                { text: 'Domain 2: MS AI Solutions', link: '/certifications/azure/ab-731/domain-2' },
                { text: 'Domain 3: Adoption', link: '/certifications/azure/ab-731/domain-3' },
                { text: 'Exam Guide', link: '/certifications/azure/ab-731/exam-guide' },
                { text: 'Cheatsheet', link: '/certifications/azure/ab-731/cheatsheet' }
              ]
            }
          ]
        },
        {
          text: '🌈 Google Cloud Certifications',
          collapsed: true,
          items: [
            {
              text: 'GCP-GAIL: Generative AI Leader',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/certifications/google-cloud/gen-ai-leader/' },
                { text: 'Domain 1: Vertex AI Architecture', link: '/certifications/google-cloud/gen-ai-leader/domain-1' },
                { text: 'Domain 2: Data & RAG', link: '/certifications/google-cloud/gen-ai-leader/domain-2' },
                { text: 'Domain 3: Model Customization', link: '/certifications/google-cloud/gen-ai-leader/domain-3' },
                { text: 'Domain 4: GenAIOps', link: '/certifications/google-cloud/gen-ai-leader/domain-4' },
                { text: 'Exam Guide', link: '/certifications/google-cloud/gen-ai-leader/exam-guide' },
                { text: 'Cheatsheet', link: '/certifications/google-cloud/gen-ai-leader/cheatsheet' },
                { text: 'Exam Tips', link: '/certifications/google-cloud/gen-ai-leader/exam-tips' }
              ]
            }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Exam Playbook',
          items: [
            { text: 'Overview', link: '/resources/exam-prep-guide' }
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
      message: 'Happy Studying! 🚀 • Privacy-friendly analytics — no cookies, no personal data<br><a href="/privacy">Privacy Policy</a> • <a href="/ai-disclaimer">AI Disclaimer</a> • <a href="https://github.com/gobinathm/Notes/issues" target="_blank">Report an issue</a>',
      copyright: '<span class="cursive-text">Made with ❤️ and too much ☕ by <span class="gradient-text">Gobi</span></span>'
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
