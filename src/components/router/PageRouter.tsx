import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "../mainPage/MainPage";
import { Home } from "../mainPage/home/Home";
import { Login } from "../mainPage/login-register/Login";
import { Register } from "../mainPage/login-register/Register";
import { Search } from "../mainPage/search/Search";
import { Verify } from "../mainPage/verify/Verify";
import { RestorePassword } from "../mainPage/login-register/RestorePassword";
import { PutEmail } from "../mainPage/login-register/PutEmail";
import { Profile } from "../mainPage/profile/Profile";
import { Followers } from "../mainPage/profile/followers-subscribers/Followers";
import { Subscribers } from "../mainPage/profile/followers-subscribers/Subscribes";
import { ChangeAvatar } from "../mainPage/account/changeAvatar/ChangeAvatar";
import { ChangeUsername } from "../mainPage/account/changeUsername/ChangeUsername";
import { ChangeDescription } from "../mainPage/account/changeDescription/ChangeDescription";
import { ChangeEmail } from "../mainPage/account/changeEmail/ChangeEmail";
import { ChangeRegion } from "../mainPage/account/changeRegion/ChangeRegion";
import { AccountInfo } from "../mainPage/account/accountInfo/AccountInfo";
import { ChangePassword } from "../mainPage/account/changePassword/ChangePassword";
import { Playlist } from "../mainPage/playlist/Playlist";
import { Upload } from "../upload/Upload";
import { Player } from "../mainPage/player/Player";
import { UserContext } from "../../contexts/UserContext";
import { Notifications } from "../mainPage/notifications/Notifications";

export const pageRouter = createBrowserRouter([
  {
    path: '/',
    element:
      <UserContext>
        <MainPage />
      </UserContext>,
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
      },
      {
        path: '/:id/playlists',
        element: <Playlist />
      },
      {
        path: '/:id/songs/upload',
        element: <Upload />
      },
      {
        path: '/:song/play',
        element: <Player />
      },
      {
        path: '/notifications/:id',
        element: <Notifications />
      }
    ]
  }
]);