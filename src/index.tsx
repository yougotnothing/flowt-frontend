import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import { MainPage } from './components/mainPage/mainPage';
import { Search } from './components/search/search';
import { Home } from './components/mainPage/home/home';
import { Login } from './components/mainPage/login-register/login';
import { Register } from './components/mainPage/register/register';

const pageRouter = createBrowserRouter([
  {
    path: '/home',
    element: <MainPage />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'search',
        element: <Search />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={pageRouter}/>
  </React.StrictMode>
);