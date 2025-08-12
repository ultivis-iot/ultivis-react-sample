import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import {
  UltivisDeviceProvider,
  RoutingProvider,
  MenuBar,
  ContextDashboard,
  StaticDashboard,
  NotFound,
} from "@ultivis-iot/react";

import Text from "./Text";

const Main = lazy(() => import("./Main"));
const Groups = lazy(() => import("./Groups"));

export const router = createHashRouter([
  {
    element: (
      <UltivisDeviceProvider>
        <RoutingProvider>
          <Main />
        </RoutingProvider>
      </UltivisDeviceProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <MenuBar />
            <StaticDashboard
              widgets={[
                {
                  title: `CCTV #4`,
                  content: <Text key="camera_d" text="Hello Widget" />,
                  i: "d",
                  x: 2,
                  y: 2,
                  w: 10,
                  h: 10,
                },
              ]}
              widgetMargin={24}
            />
          </>
        ),
      },
      {
        path: "/group/:groupId",
        element: <Groups />,
        children: [
          {
            path: "dashboard/:dashboardId",
            element: <ContextDashboard />,
          },
        ],
      },
      {
        path: "device/:deviceId",
        element: <Groups />,
        children: [
          {
            path: "dashboard/:dashboardId",
            element: <ContextDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
