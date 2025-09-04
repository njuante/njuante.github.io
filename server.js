/**
 * Express server with dynamic routing
 * 
 * To run:
 * npm install
 * npm run dev
 */

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const expressLayouts = require('express-ejs-layouts');

// Create Express app
const app = express();

// Configure port
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set("layout extractScripts", true);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Load API handlers
const contactApi = require('./api/contact');

// Load data functions
async function loadProjectsData() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Error loading projects data:', error);
    return [];
  }
}

async function loadBlogData() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Error loading blog data:', error);
    return [];
  }
}

// Routes
// Home page
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Juan Núñez — Portafolio',
    page: 'home'
  });
});

// Projects page
app.get('/projects', async (req, res) => {
  const projects = await loadProjectsData();
  res.render('projects', { 
    title: 'Proyectos | Juan Núñez',
    page: 'projects',
    projects
  });
});

// Blog page
app.get('/blog', async (req, res) => {
  const posts = await loadBlogData();
  res.render('blog', { 
    title: 'Blog | Juan Núñez',
    page: 'blog',
    posts
  });
});

// Individual blog post page
app.get('/blog/:id', async (req, res) => {
  const posts = await loadBlogData();
  const post = posts.find((post, index) => index === parseInt(req.params.id) || post.slug === req.params.id);
  
  if (!post) {
    return res.status(404).render('error', { 
      title: '404 - No encontrado',
      message: 'La entrada del blog que buscas no existe.'
    });
  }
  
  res.render('post', { 
    title: `${post.titulo} | Juan Núñez`,
    page: 'blog',
    post
  });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contacto | Juan Núñez',
    page: 'contact'
  });
});

// API Routes
app.post('/api/contact', contactApi);

// Error handling for 404 routes
app.use((req, res) => {
  res.status(404).render('error', { 
    title: '404 - Página no encontrada',
    message: 'La página que buscas no existe.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop`);
});
