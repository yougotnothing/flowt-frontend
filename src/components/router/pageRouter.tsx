import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../mainPage/mainPage";
import { Home } from "../mainPage/home/home";
import { Login } from "../mainPage/login-register/login";
import { Register } from "../mainPage/login-register/register";
import { Search } from "../search/search";

export const pageRouter = createBrowserRouter([
  {
    path: '/',
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