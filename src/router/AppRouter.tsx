import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { EventsInformationPage } from "../features/events/pages/EventsInformationPage";
import { EventsRoutes } from "../features/events/routes/EventsRoutes";
import { RegisterPonenciaPage } from "../features/events/pages/RegisterPonenciaPage";
import { RegisterTechnicalVisitPage } from "../features/events/pages/RegisterTechnicalVisitPage";
import { RegisterWorkshopPage } from "../features/events/pages/RegisterWorkshopPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFoundPage } from "../shared/components/NotFoundPage";
import { PublicRoutes } from "./PublicRoutes";
import { useAuth } from "../features/auth/hooks/useAuth";

const PathRedirect = () => {
  const { isLogged } = useAuth();
  return isLogged ? (
    <Navigate to='/events-information' replace />
  ) : (
    <Navigate to='/login' replace />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PathRedirect />,
  },
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <EventsRoutes />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to='/events-information' />,
      },
      {
        path: "/events-information",
        element: <EventsInformationPage />,
      },
      {
        path: "/event-register",
        element: <RegisterPonenciaPage />,
      },
      {
        path: "/workshop-register",
        element: <RegisterWorkshopPage />,
      },
      {
        path: "/technical-visit-register",
        element: <RegisterTechnicalVisitPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
