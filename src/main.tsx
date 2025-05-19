
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error handling
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    console.log("Mounting React app to root element");
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Failed to mount React app:", error);
    // Display error to user
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Application Error</h1>
        <p>Sorry, the application failed to load. Please check the console for details.</p>
        <p style="color: red;">${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
} else {
  console.error("Root element not found. Make sure there is a div with id='root' in the HTML.");
}
