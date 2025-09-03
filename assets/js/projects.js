// Projects rendering
document.addEventListener('DOMContentLoaded', function() {
  // Load projects data
  loadProjectsData()
    .then(data => {
      renderProjects(data);
      initProjectFilters();
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
});

async function loadProjectsData() {
  // Try to load from data file, fallback to inline data if not available
  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
      throw new Error('Failed to load projects data');
    }
    return await response.json();
  } catch (error) {
    console.warn('Using fallback project data:', error);
    // Fallback data
    return [
      {
        titulo: 'HomeLab Orquestado',
        desc: 'Infra casera con Coolify, Pi-hole y monitoring.',
        icono: '🧩',
        tags: ['cloud','devops','docker'],
        demo: '#', repo: '#'
      },
      {
        titulo: 'Dashboard de Red',
        desc: 'Rastrea dispositivos conectados en tu LAN (Raspberry Pi).',
        icono: '📶',
        tags: ['frontend','rust','raspberry'],
        demo: '#', repo: '#'
      },
      {
        titulo: 'RAG para Docs',
        desc: 'Búsqueda semántica con embeddings y OpenAI.',
        icono: '🧠',
        tags: ['ia','cloud','node'],
        demo: '#', repo: '#'
      },
      {
        titulo: 'To‑Do en Rust',
        desc: 'App de tareas CLI/Web escrita en Rust.',
        icono: '🦀',
        tags: ['rust','frontend'],
        demo: '#', repo: '#'
      },
      {
        titulo: 'Proxy + AdBlock',
        desc: 'Proxy local con filtrado y listas personalizadas.',
        icono: '🛡️',
        tags: ['cloud','devops'],
        demo: '#', repo: '#'
      },
      {
        titulo: 'Strapi + React',
        desc: 'CMS headless con frontend React moderno.',
        icono: '⚛️',
        tags: ['frontend','node'],
        demo: '#', repo: '#'
      }
    ];
  }
}

function renderProjects(projects, filter = 'all') {
  const grid = document.getElementById('gridProyectos');
  const tpl = document.getElementById('tplProyecto');
  
  if (!grid || !tpl) return;
  
  // Clear grid
  grid.innerHTML = '';
  
  // Filter projects
  const filteredProjects = projects.filter(p => 
    filter === 'all' ? true : p.tags.includes(filter)
  );
  
  // Render each project
  filteredProjects.forEach(project => {
    const node = tpl.content.cloneNode(true);
    
    // Set project data
    node.querySelector('.aspect-video').textContent = project.icono;
    node.querySelector('h3').textContent = project.titulo;
    node.querySelector('p').textContent = project.desc;
    
    // Add tags
    const tagsWrap = node.querySelector('div.flex.flex-wrap');
    project.tags.forEach(tag => {
      const chip = document.createElement('span');
      chip.className = 'text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1';
      chip.textContent = tag;
      tagsWrap.appendChild(chip);
    });
    
    // Set links
    node.querySelector('a.demo').href = project.demo;
    node.querySelector('a.repo').href = project.repo;
    
    // Add to grid
    grid.appendChild(node);
  });
}

function initProjectFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      // Update active button style
      document.querySelectorAll('.filter-btn').forEach(b => 
        b.classList.remove('bg-slate-100','dark:bg-slate-800')
      );
      btn.classList.add('bg-slate-100','dark:bg-slate-800');
      
      // Get filter value and render
      const filter = btn.dataset.filter;
      const projects = await loadProjectsData();
      renderProjects(projects, filter);
    });
  });
}
