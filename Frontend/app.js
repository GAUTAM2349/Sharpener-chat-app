import React, { lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./src/components/Header/NavBar";
const Login = lazy(() => import("./src/components/auth/Login"));
import Signup from "./src/components/auth/Signup";
import Chatpage from "./src/components/chat/Chatpage";
import UserContext from "./utils/UserContext";
import ChatsContext from "./utils/ChatsContext";
import UserProvider from "./utils/UserProvider";
import Homepage from "./src/components/Homepage/Homepage";
import CreateGroup from "./src/components/Group/CreateGroup";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./utils/AuthProvider";

// const AppLayout = () => {

//   const [user, setUser] = useState(0);

//   const getUser = () =>{
//       const response =
//   }

//   return (
//     <>
//       <div className="relative">
//         <UserContext.Provider value={{ user: { id: 1 } }}>
//           <NavBar />

//           <Outlet />
//         </UserContext.Provider>
//       </div>
//     </>
//   );
// };

const AppLayout = () => {
  return (
    <>
    <AuthProvider>
    <PrivateRoute>
      <div className="relative">
        <UserProvider>
          <NavBar />
          <Outlet />
        </UserProvider>
      </div>
    </PrivateRoute>
    </AuthProvider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/chat",
        element: <Chatpage />,
      },

      {
        path: "/home",
        element: <Homepage />,
      },

      {
        path: "/create-group",
        element: <CreateGroup />,
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={appRouter} />
  
);   
