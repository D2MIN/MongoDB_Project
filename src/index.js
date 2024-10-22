import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from './Router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
