// Form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = {
        nombre: form.nombre.value,
        email: form.email.value,
        asunto: form.asunto.value,
        mensaje: form.mensaje.value
      };
      
      // Basic validation
      let isValid = true;
      let errorMessage = '';
      
      if (!formData.nombre.trim()) {
        isValid = false;
        errorMessage = 'Por favor, ingresa tu nombre';
      } else if (!formData.email.trim() || !validateEmail(formData.email)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
      } else if (!formData.mensaje.trim()) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un mensaje';
      }
      
      if (!isValid) {
        alert(errorMessage);
        return;
      }
      
      // Submit form data
      submitForm(formData)
        .then(response => {
          form.reset();
          alert('¡Mensaje enviado con éxito! Te responderé a la brevedad.');
        })
        .catch(error => {
          alert('Lo siento, ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde o contáctame directamente por email.');
        });
    });
  }
});

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Form submission
async function submitForm(data) {
  // Check if we're on GitHub Pages (static site)
  const isStatic = window.location.hostname.includes('github.io') || 
                   document.querySelector('base') !== null;
                   
  if (isStatic) {
    // For GitHub Pages, we'll use a different approach (e.g., FormSpree, Netlify Forms)
    // Since we can't use server-side processing
    
    try {
      // FormSpree example - replace 'your-form-id' with your actual form ID
      // const response = await fetch('https://formspree.io/f/your-form-id', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For demo purposes on GitHub Pages, simulate a successful response
      console.log('Static site form submission data:', data);
      
      // You could redirect to a thank you page instead
      // window.location.href = '/thank-you';
      
      return { success: true, message: 'Form submission simulated for static site' };
      
    } catch (error) {
      console.error('Error al enviar el formulario (static site):', error);
      throw error;
    }
  } else {
    // Regular API endpoint for dynamic site
    try {
      // Get base URL for GitHub Pages compatibility
      const baseUrl = document.querySelector('base')?.getAttribute('href') || '';
      
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      throw error;
    }
  }
}

// This function is intentionally left empty to be implemented later if needed
// It can be used to add more functionality to the form submission process
