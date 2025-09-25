import type { APIRoute } from 'astro';
import { createProject } from '../../../lib/admin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Token de autorización requerido'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await request.json();
    
    if (!data.title || !data.description || !data.content || !data.image || !data.tags) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Título, descripción, contenido, imagen y tags son requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const slug = await createProject({
      title: data.title,
      description: data.description,
      content: data.content,
      image: data.image,
      tags: Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim()),
      github: data.github,
      demo: data.demo,
      featured: data.featured || false
    });

    return new Response(JSON.stringify({
      success: true,
      slug,
      message: 'Proyecto creado exitosamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Create project error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
