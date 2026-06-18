import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AI Company Framework",
  description: "Turn your IDE into a self-governing AI company",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Plugins & Skills', link: '/plugins' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/thonguyen98vn/AI-Company-framework' }
    ]
  }
})
