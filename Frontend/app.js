import React, { lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./src/components/Header/NavBar";
const Login = lazy(() => import("./src/components/auth/Login"));
import Signup from "./src/components/auth/Signup";
import Homepage from "./src/components/chat/Homepage";
import UserContext from "./utils/UserContext";
import ChatsContext from "./utils/ChatsContext";
import UserProvider from "./utils/UserProvider";

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
    <div className="relative">
      <UserProvider>
        <NavBar />
        <Outlet />
      </UserProvider>
    </div>
  );
};


const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Homepage />,
      },

      {
        path: "/login",
        element: <Login />,
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
root.render(<RouterProvider router={appRouter} />);
