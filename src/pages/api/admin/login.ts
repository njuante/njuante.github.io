import type { APIRoute } from 'astro';
import { validateAdmin } from '../../../lib/admin';
import crypto from 'crypto';

export const prerender = false;

// Simple session storage (in production, use Redis or database)
const sessions = new Map<string, { username: string; expires: Date }>();

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Usuario y contraseña requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isValid = await validateAdmin(username, password);
    
    if (!isValid) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Credenciales incorrectas'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    sessions.set(token, { username, expires });

    return new Response(JSON.stringify({
      success: true,
      token,
      message: 'Autenticación exitosa'
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/admin`
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Verify session token
export function verifySession(token: string): boolean {
  const session = sessions.get(token);
  if (!session) return false;
  
  if (session.expires < new Date()) {
    sessions.delete(token);
    return false;
  }
  
  return true;
}
