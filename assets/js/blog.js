// Blog posts rendering
document.addEventListener('DOMContentLoaded', function() {
  // Load blog posts data
  loadBlogData()
    .then(posts => {
      renderBlogPosts(posts);
    })
    .catch(error => {
      console.error('Error loading blog posts:', error);
    });
});

async function loadBlogData() {
  // Try to load from data file, fallback to inline data if not available
  try {
    const response = await fetch('/data/posts.json');
    if (!response.ok) {
      throw new Error('Failed to load blog data');
    }
    return await response.json();
  } catch (error) {
    console.warn('Using fallback blog data:', error);
    // Fallback data
    return [
      { 
        titulo: 'Desplegando sitios estáticos en Coolify', 
        resumen: 'Pipeline minimalista con Git y despliegue automático.', 
        fecha: '2025-08-10' 
      },
      { 
        titulo: 'RAG en 10 minutos', 
        resumen: 'Arquitectura básica para hacer preguntas a tus documentos.', 
        fecha: '2025-07-22' 
      },
      { 
        titulo: 'Hardening rápido de una Raspberry Pi', 
        resumen: 'Checklist práctico para endurecer tu sistema.', 
        fecha: '2025-06-05' 
      }
    ];
  }
}

function renderBlogPosts(posts) {
  const gridPosts = document.getElementById('gridPosts');
  const tplPost = document.getElementById('tplPost');
  
  if (!gridPosts || !tplPost || !posts.length) return;
  
  // Clear grid
  gridPosts.innerHTML = '';
  
  // Render each post
  posts.forEach(post => {
    const node = tplPost.content.cloneNode(true);
    
    // Set post data
    node.querySelector('h3').textContent = post.titulo;
    node.querySelector('p').textContent = post.resumen;
    
    // Format date
    const formattedDate = new Date(post.fecha).toLocaleDateString('es-ES', { 
      dateStyle: 'medium' 
    });
    node.querySelector('div').textContent = formattedDate;
    
    // Add to grid
    gridPosts.appendChild(node);
  });
}
