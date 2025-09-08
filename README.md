# 🌟 Personal Portfolio Website

A modern, responsive personal portfolio website built with **Astro** and **Tailwind CSS**. Features a clean design, dark/light mode toggle, blog functionality, project showcase, and contact form.

![Portfolio Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Portfolio+Screenshot)

## ✨ Features

### 🎨 Design & UI
- **Modern, Clean Design**: Following current UI/UX trends with glassmorphism effects
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Smooth Animations**: Subtle transitions and loading effects
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

### 📱 Pages & Functionality
- **Home**: Engaging hero section with animated background and clear CTAs
- **Blog**: Dynamic blog with Markdown/MDX support and SEO optimization
- **Projects**: Showcase of personal and professional work with tags and links
- **Contact**: Functional contact form with Formspree integration

### ⚡ Performance & SEO
- **Optimized for Speed**: Static site generation with minimal JavaScript
- **SEO Friendly**: Meta tags, Open Graph, and semantic HTML
- **Core Web Vitals**: Excellent performance scores
- **GitHub Pages Ready**: Automated deployment workflow included

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/myweb.git
   cd myweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:4321
   ```

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── ...
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.astro
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts (Markdown)
│   │   └── config.ts      # Content schema
│   ├── layouts/           # Page layouts
│   │   └── Layout.astro
│   ├── pages/             # File-based routing
│   │   ├── index.astro    # Home page
│   │   ├── blog.astro     # Blog listing
│   │   ├── blog/
│   │   │   └── [...slug].astro  # Blog post template
│   │   ├── projects.astro # Projects showcase
│   │   ├── contact.astro  # Contact form
│   │   └── contact/
│   │       └── success.astro    # Form success page
│   └── styles/
│       └── global.css     # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── astro.config.mjs       # Astro configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## 🛠️ Customization

### Personal Information
1. **Update site metadata** in `src/layouts/Layout.astro`
2. **Modify hero section** in `src/pages/index.astro`
3. **Update contact email** in `src/pages/contact.astro`
4. **Change social links** in `src/components/Footer.astro`

### Styling
- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Change font imports in `src/layouts/Layout.astro`
- **Animations**: Customize animations in `src/styles/global.css`

### Content
- **Blog Posts**: Add Markdown files to `src/content/blog/`
- **Projects**: Update the projects array in `src/pages/projects.astro`
- **Images**: Add images to the `public/` directory

### Contact Form Setup

The contact form uses [Formspree](https://formspree.io/) for form handling:

1. **Sign up** for a free Formspree account
2. **Create a new form** and get your form endpoint
3. **Update the form action** in `src/pages/contact.astro`:
   ```astro
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. **Update the email** in the hidden field:
   ```astro
   <input type="hidden" name="_to" value="your.email@gmail.com">
   ```

## 📝 Adding Blog Posts

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: "2024-01-15"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Title

Your post content here...
```

## 🚀 Deployment

### GitHub Pages (Recommended)

**⚠️ Important Setup Steps:**

1. **Update site configuration**:
   ```js
   // astro.config.mjs
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
   });
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Configure GitHub Pages CORRECTLY**:
   - Go to your repository **Settings**
   - Navigate to **"Pages"** section in the sidebar
   - Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
   - This is crucial - Jekyll deployment will fail with Astro files

4. **Verify deployment**:
   - Check the **"Actions"** tab in your repository
   - The workflow should run automatically on push
   - Your site will be available at `https://yourusername.github.io/your-repo-name`

**🚫 Common Issue**: If you see Jekyll errors, make sure you selected **"GitHub Actions"** as the source, not "Deploy from a branch". The `.nojekyll` file is included to prevent Jekyll processing.

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the `dist/` directory
# Upload the contents of `dist/` to your web server
```

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy automatically
- **Vercel**: Import your project and deploy with zero configuration
- **Cloudflare Pages**: Connect your repository for automatic deployments

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
npm run astro sync   # Generate TypeScript types for content collections
```

## 🤝 Contributing

This is a personal portfolio template, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## � Acknowledgments

- **Astro** - The modern static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **Formspree** - Form backend service
- **Inter Font** - Beautiful typography

## 📞 Support

If you have questions or need help customizing this template:

- 📧 Email: juanteofi@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/myweb/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/myweb/discussions)

---

Made with ❤️ by [Juan Teo](https://github.com/yourusername)
