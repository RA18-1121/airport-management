
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Function to handle initial rendering with error handling
const renderApp = () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    try {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      console.log("Application rendered successfully");
    } catch (error) {
      console.error("Error rendering application:", error);
      // Display a fallback UI in case of critical rendering error
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h2>Something went wrong</h2>
          <p>Please try refreshing the page</p>
          <pre style="text-align: left; background: #f1f1f1; padding: 10px; border-radius: 5px;">${error.message}</pre>
        </div>
      `;
    }
  } else {
    console.error("Root element not found! Check if the 'root' element exists in your HTML.");
  }
};

// Start the application
renderApp();
