
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add enhanced error handling for GitHub Pages
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    console.log("Mounting React app to root element");
    console.log("Current URL:", window.location.href);
    console.log("Environment:", import.meta.env.MODE);
    console.log("Base URL:", document.baseURI);
    console.log("Pathname:", window.location.pathname);
    
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Failed to mount React app:", error);
    // Display detailed error to user
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Application Error</h1>
        <p>Sorry, the application failed to load. Please check the console for details.</p>
        <p style="color: red;">${error instanceof Error ? error.message : String(error)}</p>
        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border: 1px solid #ddd; text-align: left;">
          <p><strong>Debug Info:</strong></p>
          <p>URL: ${window.location.href}</p>
          <p>Path: ${window.location.pathname}</p>
          <p>Base: ${document.baseURI}</p>
        </div>
      </div>
    `;
  }
} else {
  console.error("Root element not found. Make sure there is a div with id='root' in the HTML.");
}
