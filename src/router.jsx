import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import {
  UltivisDeviceProvider,
  MenuBar,
  ContextDashboard,
} from "@ultivis/library";
const Main = lazy(() => import("./Main"));

export const router = createHashRouter([
  {
    element: (
      <UltivisDeviceProvider>
        <Main />
      </UltivisDeviceProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <MenuBar />
            <ContextDashboard />
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <></>,
  },
]);
