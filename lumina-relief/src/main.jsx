import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";

import LandingPage from "./routes/LandingPage.jsx";
import SignIn from "./routes/SignIn.jsx";
import Dashboard from "./routes/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/portal",
    element: <Dashboard />,
    children: [
      // If you want to nest pages inside the dashboard later:
      // { path: "inventory", element: <Inventory /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
