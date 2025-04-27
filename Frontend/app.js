import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "./src/components/Header/NavBar";
const Login = lazy(() => import("./src/components/auth/Login"));
import Signup from "./src/components/auth/Signup";
import Homepage from "./src/components/chat/Homepage";
import UserContext from "./utils/UserContext";
import ChatsContext from "./utils/ChatsContext";

const AppLayout = () => {
    return (
      <>
      <div className="relative">
      
      <UserContext.Provider value={ {user : {id:1}}}>
        <NavBar />
        
        <Outlet />
        </UserContext.Provider>
      
      </div>
      </>
    );
  };



const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [

        {
          path : "/home",
          element : <Homepage/>
        },

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