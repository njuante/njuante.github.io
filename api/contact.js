/**
 * Contact form API handler
 * 
 * This is a sample API file that could be used with frameworks like Express, Next.js, or
 * serverless functions (Vercel, Netlify, etc.)
 * 
 * Usage examples:
 * - Node.js/Express: Integrate into your routes folder
 * - Next.js: Use as an API route at pages/api/contact.js
 * - Netlify: Use as a serverless function
 */

// Sample implementation for Node.js with Express
/*
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        ok: false,
        error: 'Campos obligatorios faltantes'
      });
    }
    
    // Create transport (replace with your SMTP settings)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    // Send email
    await transporter.sendMail({
      from: `"Portafolio Web" <${process.env.SMTP_USER}>`,
      to: "tu@email.com",
      subject: `Nuevo mensaje: ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`,
      html: `
        <h3>Nuevo mensaje desde tu web</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <h4>Mensaje:</h4>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    
    // Log submission (optional)
    console.log(`Nuevo mensaje recibido de ${name} (${email})`);
    
    // Return success
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Error al procesar el formulario'
    });
  }
});

module.exports = router;
*/

// Sample implementation for Netlify functions
exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { name, email, phone, subject, message } = JSON.parse(event.body);
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ 
          ok: false,
          error: 'Campos obligatorios faltantes'
        })
      };
    }
    
    // Here you would integrate with your preferred email service
    // Examples: Nodemailer, SendGrid, AWS SES, etc.
    
    // Return success
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        ok: false, 
        error: 'Error al procesar el formulario'
      })
    };
  }
};
