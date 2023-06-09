import React, { Children } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import RootLayout from './Routes/RootLayout';
import Home from './pages/Home';
import MyForm from "./pages/MyForm";
import Edit from "./pages/Edit";


const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myform",
        element: <MyForm />,
      },
      {
        path: "/Edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

function App() {
return (
  <RouterProvider router={router} />
);
}
export default App;

