import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { PuzzleProvider } from './context/PuzzleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PuzzleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PuzzleProvider>
    </AuthProvider>
  </StrictMode>,
);
