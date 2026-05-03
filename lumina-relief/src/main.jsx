import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";

import LandingPage from "./routes/LandingPage.jsx";
import SignIn from "./routes/SignIn.jsx";
import CompanyDashboard from "./routes/CompanyDashboard.jsx";
import SignUp from "./routes/SignUp.jsx";
import Inventory from "./routes/Inventory.jsx";

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
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/portal",
    element: <CompanyDashboard />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
