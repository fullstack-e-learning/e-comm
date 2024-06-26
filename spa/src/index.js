import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './view/ErrorPage';
import Admin from './Admin';
import NewCategory from './view/admin/NewCategory';
import NewProduct from './view/admin/NewProduct';
import ProductsByCategory from './view/admin/ProductsByCategory';
import Dashboard from './view/customer/Dashboard';
import Home from './view/admin/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />
      }
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category",
        element: <NewCategory />,
      },
      {
        path: "category/:categoryId",
        element: <ProductsByCategory />,
      },
      {
        path: "product",
        element: <NewProduct />,
      }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
