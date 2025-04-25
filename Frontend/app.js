import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./src/components/Header/NavBar";
import Login from "./src/components/auth/Login";
import Signup from "./src/components/auth/Signup";

const AppLayout = () => {
    return (
      < >
        <NavBar />
        <Outlet />
      </>
    );
  };



const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [

        {
          path : "/login",
          element: <Login/>
        },

        {
          path : "/signup",
          element : <Signup/>
        }
          
    ],
},
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);