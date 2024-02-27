import { createBrowserRouter } from "react-router-dom";
import { OrgHomePage } from "./pages/HomePage/OrgHomePage";
import { VolunteerHomePage } from "./pages/HomePage/VolunteerHomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/homepage/org",
    element: <OrgHomePage />,
  },
  {
    path: "/homepage/volunteer",
    element: <VolunteerHomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
