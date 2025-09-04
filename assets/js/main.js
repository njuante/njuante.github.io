// Core functionality
document.addEventListener('DOMContentLoaded', function() {
  // Theme (dark/light)
  initTheme();
  
  // Mobile menu
  initMobileMenu();
  
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Theme handling
function initTheme() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  
  function setTheme(mode) {
    if (mode === 'dark') {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }
  
  // Init theme from localStorage or system preference
  const persisted = localStorage.theme || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(persisted);
  
  // Theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(root.classList.contains('dark') ? 'light' : 'dark');
    });
  }
}

// Mobile menu
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}
