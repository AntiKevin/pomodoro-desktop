import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";

import './index.css';

import './demos/ipc';
import { AppRoutes } from './routes';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
//import './demos/node';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
