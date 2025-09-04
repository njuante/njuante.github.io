# Modern Portfolio Website with Astro

This is a personal portfolio website built with Astro, featuring a modern and fluid design with dark/light mode toggle, responsive layouts, and a working contact form.

## ✨ Features

- 🎨 Modern, fluid aesthetic with smooth animations
- 🌓 Dark/light mode toggle with user preference detection
- 📱 Fully responsive for all screen sizes
- 📝 Blog section with Markdown support
- 💼 Projects showcase with filtering functionality
- 📬 Working contact form using EmailJS
- 🔍 SEO-ready with meta tags and optimized structure
- ⚡ Fast loading with optimized assets
- 🚢 Ready for GitHub Pages deployment

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - The main framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [React](https://reactjs.org/) - For interactive components
- [EmailJS](https://www.emailjs.com/) - For handling contact form submissions
- [AOS](https://michalsnik.github.io/aos/) - For scroll animations
- [Framer Motion](https://www.framer.com/motion/) - For advanced animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/njuante/myweb.git
cd myweb
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit http://localhost:4321

## 🔧 Customization Guide

### Personal Information

Edit the following files to add your personal information:

1. Update site configuration in `astro.config.mjs`:
```js
site: 'https://yourusername.github.io',
base: '/your-repo-name',
```

2. Update content in component files:
- `src/components/Hero.astro` - Main landing page content
- `src/components/About.astro` - About section content and skills
- `src/components/FeaturedProjects.astro` - Project showcases
- `src/components/Footer.astro` - Contact links and copyright

### Contact Form

1. Create an account on [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update the EmailJS configuration in `src/components/ContactForm.astro`:
```js
// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY");

// Replace with your actual service ID and template ID
await emailjs.send(
  "service_id",
  "template_id",
  formData
);
```

### Adding Projects

Add new projects in `src/pages/projects.astro` by adding to the `projects` array:

```js
{
  title: "Project Title",
  description: "Project description text",
  tags: ["Tag1", "Tag2", "Tag3"],
  image: "/images/projects/image.jpg",
  link: "/projects/project-slug",
  github: "https://github.com/username/repo",
  featured: true // Set to true to mark as featured
}
```

### Adding Blog Posts

Add new blog posts in `src/pages/blog/[slug].astro` by adding to the `getStaticPaths` function:

```js
{
  params: { slug: 'your-post-slug' },
  props: {
    post: {
      title: "Your Post Title",
      date: "Month Day, Year",
      author: "Your Name",
      image: "/images/blog/image.jpg",
      tags: ["Tag1", "Tag2", "Tag3"],
      content: `
# Your Markdown Content Here
      `
    }
  }
}
```

For a more scalable approach, consider using Astro's Content Collections or integrating with a CMS.

## 📦 Project Structure

```
/
├── public/
│   └── images/
│       ├── blog/
│       └── projects/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── blog/
│   │   └── projects/
│   └── styles/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🚀 Deployment to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages:

1. Push your code to a GitHub repository
2. In your repository settings, enable GitHub Pages
3. Select the `gh-pages` branch as the source
4. GitHub Actions will automatically build and deploy your site when you push to main

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- Juan - [GitHub Profile](https://github.com/njuante)
