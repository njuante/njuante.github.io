// Form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    initFormValidation(form);
    initFormPersistence(form);
  }
});

function initFormValidation(form) {
  const formStatus = document.getElementById('formStatus');
  const submitText = document.getElementById('submitText');
  const loadingText = document.getElementById('loadingText');
  
  // Validate form on submit
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset previous errors
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    formStatus.textContent = '';
    formStatus.className = 'text-sm';
    
    // Validate each required field
    let hasError = false;
    
    // Name validation
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
      document.querySelector('[data-for="name"]').classList.remove('hidden');
      hasError = true;
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      document.querySelector('[data-for="email"]').classList.remove('hidden');
      hasError = true;
    }
    
    // Subject validation
    const subjectInput = document.getElementById('subject');
    if (!subjectInput.value) {
      document.querySelector('[data-for="subject"]').classList.remove('hidden');
      hasError = true;
    }
    
    // Message validation
    const messageInput = document.getElementById('message');
    if (!messageInput.value.trim()) {
      document.querySelector('[data-for="message"]').classList.remove('hidden');
      hasError = true;
    }
    
    // Privacy checkbox validation
    const privacyInput = document.querySelector('input[name="privacy"]');
    if (!privacyInput.checked) {
      document.querySelector('[data-for="privacy"]').classList.remove('hidden');
      hasError = true;
    }
    
    // If validation passes, submit the form
    if (!hasError) {
      submitForm(form, submitText, loadingText, formStatus);
    }
  });
  
  // Real-time validation for fields when they lose focus
  initRealTimeValidation();
}

function submitForm(form, submitText, loadingText, formStatus) {
  // Show loading state
  submitText.classList.add('hidden');
  loadingText.classList.remove('hidden');
  
  // Collect form data
  const formData = new FormData(form);
  
  // Submit to Formspree
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Hide loading state
    submitText.classList.remove('hidden');
    loadingText.classList.add('hidden');
    
    if (data.ok) {
      // Success
      form.reset();
      clearLocalStorageFormData();
      formStatus.textContent = '¡Mensaje enviado correctamente!';
      formStatus.classList.add('text-accent');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.classList.remove('text-accent');
      }, 5000);
    } else {
      // Error from server
      formStatus.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
      formStatus.classList.add('text-rose-500');
    }
  })
  .catch(error => {
    // Network or other error
    submitText.classList.remove('hidden');
    loadingText.classList.add('hidden');
    formStatus.textContent = 'Error de conexión. Verifica tu internet y vuelve a intentar.';
    formStatus.classList.add('text-rose-500');
    console.error('Form submission error:', error);
  });
}

function initRealTimeValidation() {
  const validateOnBlur = (field, errorSelector, validationFn) => {
    field.addEventListener('blur', function() {
      const errorMsg = document.querySelector(errorSelector);
      if (!validationFn(field.value)) {
        errorMsg.classList.remove('hidden');
      } else {
        errorMsg.classList.add('hidden');
      }
    });
  };
  
  validateOnBlur(
    document.getElementById('name'), 
    '[data-for="name"]', 
    value => value.trim() !== ''
  );
  
  validateOnBlur(
    document.getElementById('email'), 
    '[data-for="email"]', 
    value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
  
  validateOnBlur(
    document.getElementById('message'), 
    '[data-for="message"]', 
    value => value.trim() !== ''
  );
  
  document.getElementById('subject').addEventListener('change', function() {
    const errorMsg = document.querySelector('[data-for="subject"]');
    if (!this.value) {
      errorMsg.classList.remove('hidden');
    } else {
      errorMsg.classList.add('hidden');
    }
  });
}

function initFormPersistence(form) {
  // Store form data in localStorage to prevent data loss
  form.querySelectorAll('input, textarea, select').forEach(field => {
    // Check if there's saved data and restore it
    const savedValue = localStorage.getItem(`contact_${field.name}`);
    if (savedValue && field.type !== 'checkbox') {
      field.value = savedValue;
    } else if (savedValue && field.type === 'checkbox') {
      field.checked = savedValue === 'true';
    }
    
    // Save data as user types/changes it
    field.addEventListener('change', function() {
      if (field.type === 'checkbox') {
        localStorage.setItem(`contact_${field.name}`, field.checked);
      } else {
        localStorage.setItem(`contact_${field.name}`, field.value);
      }
    });
  });
}

function clearLocalStorageFormData() {
  // Clear all form data from localStorage after successful submission
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('contact_')) {
      localStorage.removeItem(key);
    }
  });
}
