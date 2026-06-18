import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AI Company Framework",
  description: "Biến IDE của bạn thành một Công ty AI tự vận hành",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Giới thiệu',
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
