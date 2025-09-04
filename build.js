/**
 * Build script to generate static HTML from dynamic Express.js routes
 * for GitHub Pages deployment
 */

const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const { promisify } = require('util');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// Import data
const posts = require('./data/posts.json');
const projects = require('./data/projects.json');

const rimrafAsync = promisify(rimraf);

// Configuration
const BUILD_DIR = path.join(__dirname, 'build');
const VIEWS_DIR = path.join(__dirname, 'views');
const ASSETS_DIR = path.join(__dirname, 'assets');
const DATA_DIR = path.join(__dirname, 'data');

async function buildStaticSite() {
  try {
    console.log('🚀 Starting static site generation...');
    
    // Clean build directory
    console.log('🧹 Cleaning build directory...');
    await rimrafAsync(BUILD_DIR);
    await fs.ensureDir(BUILD_DIR);
    
    // Copy static assets
    console.log('📂 Copying static assets...');
    await fs.copy(ASSETS_DIR, path.join(BUILD_DIR, 'assets'));
    await fs.copy(DATA_DIR, path.join(BUILD_DIR, 'data'));
    
    // Read layout template
    console.log('📄 Reading layout template...');
    const layoutTemplate = await fs.readFile(path.join(VIEWS_DIR, 'layout.ejs'), 'utf8');

    // Generate index page
    console.log('🏠 Generating home page...');
    await generatePage('index', {
      title: 'Juan Núñez — Portafolio',
      page: 'home',
      base_url: '.'
    }, layoutTemplate);

    // Generate projects page
    console.log('🛠️ Generating projects page...');
    await generatePage('projects', {
      title: 'Proyectos | Juan Núñez',
      page: 'projects',
      projects,
      base_url: '..'
    }, layoutTemplate);

    // Generate blog index page
    console.log('📝 Generating blog index page...');
    await generatePage('blog', {
      title: 'Blog | Juan Núñez',
      page: 'blog',
      posts,
      base_url: '..'
    }, layoutTemplate);

    // Generate individual blog posts
    console.log('📚 Generating individual blog posts...');
    
    for (const post of posts) {
      const postDir = path.join(BUILD_DIR, 'blog', post.slug);
      await fs.ensureDir(postDir);
      
      await generatePage('post', {
        title: `${post.titulo} | Juan Núñez`,
        page: 'blog',
        post,
        base_url: '../..'
      }, layoutTemplate, path.join(postDir, 'index.html'));
    }

    // Generate contact page
    console.log('📞 Generating contact page...');
    await generatePage('contact', {
      title: 'Contacto | Juan Núñez',
      page: 'contact',
      base_url: '..'
    }, layoutTemplate);

    // Generate 404 page
    console.log('🔍 Generating 404 page...');
    await generatePage('error', {
      title: '404 - Página no encontrada',
      message: 'La página que buscas no existe.',
      base_url: '.'
    }, layoutTemplate, path.join(BUILD_DIR, '404.html'));

    // Create .nojekyll file to prevent GitHub Pages from using Jekyll
    await fs.writeFile(path.join(BUILD_DIR, '.nojekyll'), '');
    
    // Copy CNAME if exists
    if (await fs.pathExists(path.join(__dirname, 'CNAME'))) {
      await fs.copy(path.join(__dirname, 'CNAME'), path.join(BUILD_DIR, 'CNAME'));
    }

    console.log('✅ Static site generation complete!');
    console.log(`🌐 Your static site is ready in the "${BUILD_DIR}" directory.`);
    console.log('📋 You can now deploy the build directory to GitHub Pages.');
    
  } catch (error) {
    console.error('❌ Error generating static site:', error);
    process.exit(1);
  }
}

async function generatePage(template, data, layoutTemplate, outputPath = null) {
  try {
    // Default output path is at the root level with index.html
    if (!outputPath) {
      const pageDir = path.join(BUILD_DIR, template);
      await fs.ensureDir(pageDir);
      outputPath = path.join(pageDir, 'index.html');
    }

    // Render content with EJS
    const contentTemplate = await fs.readFile(path.join(VIEWS_DIR, `${template}.ejs`), 'utf8');
    const content = await ejs.render(contentTemplate, data, { 
      async: true,
      filename: path.join(VIEWS_DIR, `${template}.ejs`) 
    });
    
    // Apply layout
    const html = await ejs.render(layoutTemplate, {
      ...data,
      body: content
    }, { 
      async: true,
      filename: path.join(VIEWS_DIR, 'layout.ejs')
    });
    
    // Write to file
    await fs.writeFile(outputPath, html);
    console.log(`  ✓ Generated: ${outputPath}`);
    
  } catch (error) {
    console.error(`  ✗ Error generating ${template}:`, error);
    throw error;
  }
}

// Run build process
buildStaticSite();
