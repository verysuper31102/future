import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure dynamic PWA manifest & canonical link match exact current URL path (e.g. /future)
if (typeof window !== 'undefined') {
  const fullUrl = window.location.href;
  const currentPath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : window.location.pathname + '/';

  // 1. Set canonical link tag so iOS Safari Home Screen shortcut uses full URL with path (/future)
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = fullUrl;

  // 2. Dynamic PWA manifest blob URL matching fullUrl as start_url
  try {
    const manifestData = {
      short_name: "CareLink",
      name: "CareLink 暖心看護 - 智慧照護媒合",
      icons: [
        {
          src: "/pwa-192x192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any maskable"
        },
        {
          src: "/pwa-512x512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any maskable"
        },
        {
          src: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180"
        }
      ],
      start_url: fullUrl,
      scope: currentPath || "/",
      background_color: "#FAF9F6",
      theme_color: "#4A6741",
      display: "standalone",
      orientation: "portrait",
      description: "CareLink 簡單文青風格本國照服員智慧媒合平台"
    };

    const blob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(blob);

    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = manifestUrl;
    } else {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = manifestUrl;
      document.head.appendChild(manifestLink);
    }
  } catch (e) {
    console.error('Failed to dynamically update PWA manifest:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

