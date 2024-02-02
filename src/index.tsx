import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { pageRouter } from "./components/router/PageRouter";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={pageRouter} />
    </HelmetProvider>
  </StrictMode>
);