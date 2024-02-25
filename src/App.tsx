import { RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./contexts/notifications";
import { routes } from "./routes";

import "./css/global-styles.css";

export function App() {
  return (
    <NotificationProvider>
      <RouterProvider router={routes} />
    </NotificationProvider>
  );
}
