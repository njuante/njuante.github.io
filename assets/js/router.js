/**
 * Client-side routing support for GitHub Pages
 * This script helps handle direct navigation to deep links on GitHub Pages
 */

// Redirect script for 404.html
(function() {
  // Get the repository base path (if on GitHub Pages)
  const getBasePath = () => {
    // This detects the repository base path for GitHub Pages
    const baseElement = document.querySelector('base');
    if (baseElement) {
      return baseElement.getAttribute('href') || '';
    }
    return '';
  };
  
  // Get the current path without the base URL
  const path = window.location.pathname;
  const basePath = getBasePath();
  
  // Check if we're on a GitHub Pages 404 page
  if (document.title === '404 - Página no encontrada' && !path.endsWith('/404.html')) {
    // Store the path to redirect to after the refresh
    sessionStorage.setItem('redirectPath', path);
    
    // Redirect to index for client-side routing to take over
    window.location.replace(basePath || '/');
  }
  
  // If we have a stored redirect path, use it
  const redirectPath = sessionStorage.getItem('redirectPath');
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath');
    
    // Use history API to set the proper URL without a refresh
    history.replaceState(null, '', redirectPath);
    
    // Now let any client-side routing take over
    // If you're using a client-side router, you would trigger it here
  }
})();
