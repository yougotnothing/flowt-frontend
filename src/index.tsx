import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Player } from "./components/mainPage/player/Player";

import { pageRouter } from "./components/router/PageRouter";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={pageRouter} />
    <Player />
  </React.StrictMode>,
);
