import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "../mainPage/mainPage";
import { Home } from "../mainPage/home/home";
import { Login } from "../mainPage/login-register/login";
import { Register } from "../mainPage/login-register/register";
import { Search } from "../mainPage/search/search";
import { Verify } from "../mainPage/verify/verify";
import { RestorePassword } from "../mainPage/login-register/restorePassword";
import { PutEmail } from "../mainPage/login-register/putEmail";
import { Profile } from "../mainPage/profile/profile";
import { Followers } from "../mainPage/profile/followers-subscribers/followers";
import { Subscribers } from "../mainPage/profile/followers-subscribers/subscribes";
import { ChangeAvatar } from "../mainPage/account/changeAvatar/changeAvatar";
import { ChangeUsername } from "../mainPage/account/changeUsername/changeUsername";
import { ChangeDescription } from "../mainPage/account/changeDescription/changeDescription";
import { ChangeEmail } from "../mainPage/account/changeEmail/changeEmail";
import { ChangeRegion } from "../mainPage/account/changeRegion/changeRegion";
import { AccountInfo } from "../mainPage/account/accountInfo/accountInfo";
import { ChangePassword } from "../mainPage/account/changePassword/changePassword";

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
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/profile/:id/followers',
        element: <Followers />
      },
      {
        path: '/profile/:id/subscribes',
        element: <Subscribers />
      },
      {
        path: '/account/:id',
        element: <AccountInfo />
      },
      {
        path: '/account/:id/change-avatar',
        element: <ChangeAvatar />
      },
      {
        path: '/account/:id/change-username',
        element: <ChangeUsername />
      },
      {
        path: '/account/:id/change-description',
        element: <ChangeDescription />
      },
      {
        path: '/account/:id/change-email',
        element: <ChangeEmail />
      },
      {
        path: 'account/:id/change-region',
        element: <ChangeRegion />
      },
      {
        path: '/account/:id/change-password',
        element: <ChangePassword />
      }
    ]
  }
]);