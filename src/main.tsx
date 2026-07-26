import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure canonical link and PWA start_url match current page path (e.g., /future/)
if (typeof window !== 'undefined') {
  try {
    const fullUrl = window.location.href;
    const origin = window.location.origin;
    let path = window.location.pathname;
    if (!path.endsWith('/')) {
      path = path + '/';
    }
    const targetStartUrl = origin + path;

    // 1. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = targetStartUrl;

    // 2. Dynamically build & attach manifest with explicit start_url including subpath (/future/)
    const dynamicManifest = {
      short_name: "CareLink",
      name: "CareLink 暖心看護 - 智慧照護媒合",
      icons: [
        {
          src: "./pwa-192x192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any maskable"
        },
        {
          src: "./pwa-512x512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any maskable"
        },
        {
          src: "./apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180"
        }
      ],
      start_url: targetStartUrl,
      scope: targetStartUrl,
      background_color: "#FAF9F6",
      theme_color: "#4A6741",
      display: "standalone",
      orientation: "portrait",
      description: "CareLink 簡單文青風格本國照服員智慧媒合平台"
    };

    const blob = new Blob([JSON.stringify(dynamicManifest)], { type: 'application/json' });
    const manifestBlobUrl = URL.createObjectURL(blob);

    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = manifestBlobUrl;
    } else {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = manifestBlobUrl;
      document.head.appendChild(manifestLink);
    }
  } catch (e) {
    console.error('Failed to configure dynamic PWA start_url:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
