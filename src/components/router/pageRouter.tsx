import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "../mainPage/mainPage";
import { Home } from "../mainPage/home/home";
import { Login } from "../mainPage/login-register/login";
import { Register } from "../mainPage/login-register/register";
import { Search } from "../mainPage/search/search";
import { Verify } from "../mainPage/verify/verify";
import { RestorePassword } from "../mainPage/login-register/restorePassword";
import { PutEmail } from "../mainPage/login-register/putEmail";

export const pageRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/home/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/verify',
        element: <Verify />
      },
      {
        path: '/verify/restore-password',
        element: <RestorePassword />
      },
      {
        path: '/verify/restore-password/email',
        element: <PutEmail />
      }
    ]
  }
]);