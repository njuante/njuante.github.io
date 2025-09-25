import type { APIRoute } from 'astro';
import { createBlogPost } from '../../../lib/admin';

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

    // In a real app, verify the token properly
    // For now, just check if it exists in localStorage (client-side)
    
    const data = await request.json();
    
    if (!data.title || !data.description || !data.content) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Título, descripción y contenido son requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const slug = await createBlogPost({
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags || [],
      image: data.image
    });

    return new Response(JSON.stringify({
      success: true,
      slug,
      message: 'Post creado exitosamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Create post error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
