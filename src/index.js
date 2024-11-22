import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from './Router.js';
import reportWebVitals from './reportWebVitals.js';
import { RouterProvider } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
