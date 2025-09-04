/**
 * API endpoint for handling contact form submissions
 * 
 * This is an Express middleware function for handling contact form submissions.
 * In a production environment, you would want to send this data to an email service or save it to a database.
 */

module.exports = async (req, res) => {
  // Check for POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, email, asunto, mensaje } = req.body;

    // Basic validation
    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ 
        ok: false,
        error: 'Campos obligatorios faltantes'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        ok: false,
        error: 'Formato de email inválido'
      });
    }

    // Log the form data (replace with your actual form processing logic)
    console.log('Contact form submission:', {
      nombre,
      email,
      asunto,
      mensaje,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return res.status(200).json({
      ok: true,
      message: 'Formulario enviado correctamente'
    });
    
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    return res.status(500).json({
      ok: false,
      error: 'Error al procesar el formulario'
    });
  }
};
