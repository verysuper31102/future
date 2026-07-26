import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Service Worker Registration with explicit /future/ scope
if ('serviceWorker' in navigator && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/future/sw.js', { scope: '/future/' })
      .then((reg) => {
        console.log('CareLink Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('Primary SW registration (/future/sw.js) warning:', err);
        // Fallback for local sandbox environment
        navigator.serviceWorker
          .register('./sw.js')
          .catch((e) => console.log('SW registration fallback skipped:', e));
      });
  });
}

// 2. Ensure Canonical Link tag points to https://verysuper31102.github.io/future/
if (typeof window !== 'undefined') {
  try {
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = 'https://verysuper31102.github.io/future/';
  } catch (e) {
    console.error('Failed to set canonical link:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
