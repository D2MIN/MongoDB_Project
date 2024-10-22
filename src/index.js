import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from './Router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';
import './App/GlobalStyle/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
