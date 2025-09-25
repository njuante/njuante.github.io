import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

// Security configuration
const ADMIN_USERNAME = 'juan';
// Pre-hashed password for 'adminpannel' - never store plain text passwords
const ADMIN_PASSWORD_HASH = '$2b$10$ZqnOrOxoRbGLHz2jX1EeJuEc.YVdOj4f54obkHQnnEMJfcbA3AYGi';

export async function validateAdmin(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

export async function createBlogPost(data: {
  title: string;
  description: string;
  content: string;
  tags?: string[];
  image?: string;
}) {
  const slug = generateSlug(data.title);
  const date = new Date().toISOString().split('T')[0];
  
  const frontmatter = {
    title: data.title,
    description: data.description,
    pubDate: date,
    author: 'Juan Teo',
    tags: data.tags || [],
    ...(data.image && { image: data.image })
  };

  const yamlFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

  const fileContent = `---
${yamlFrontmatter}
---

${data.content}`;

  const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
  
  await fs.promises.writeFile(filePath, fileContent, 'utf8');
  return slug;
}

export async function createProject(data: {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}) {
  const slug = generateSlug(data.title);
  
  const frontmatter = {
    title: data.title,
    description: data.description,
    image: data.image,
    tags: data.tags,
    featured: data.featured || false,
    order: 0,
    ...(data.github && { github: data.github }),
    ...(data.demo && { demo: data.demo })
  };

  const yamlFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      if (typeof value === 'boolean') {
        return `${key}: ${value}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');

  const fileContent = `---
${yamlFrontmatter}
---

${data.content}`;

  // Create projects directory if it doesn't exist
  const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
  if (!fs.existsSync(projectsDir)) {
    await fs.promises.mkdir(projectsDir, { recursive: true });
  }

  const filePath = path.join(projectsDir, `${slug}.md`);
  
  await fs.promises.writeFile(filePath, fileContent, 'utf8');
  return slug;
}

export async function getBlogPosts() {
  try {
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const files = await fs.promises.readdir(blogDir);
    return files.filter(file => file.endsWith('.md')).map(file => file.replace('.md', ''));
  } catch (error) {
    return [];
  }
}

export async function getProjects() {
  try {
    const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
    const files = await fs.promises.readdir(projectsDir);
    return files.filter(file => file.endsWith('.md')).map(file => file.replace('.md', ''));
  } catch (error) {
    return [];
  }
}
