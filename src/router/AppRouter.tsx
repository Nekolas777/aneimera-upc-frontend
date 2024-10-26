import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { LoginPage } from "../features/auth/pages/LoginPage"
import { EventsInformationPage } from "../features/events/pages/EventsInformationPage"
import { EventsRoutes } from "../features/events/routes/EventsRoutes"
import { RegisterEventPage } from "../features/events/pages/RegisterEventPage"
import { RegisterTechnicalVisitPage } from "../features/events/pages/RegisterTechnicalVisitPage"
import { RegisterWorkshopPage } from "../features/events/pages/RegisterWorkshopPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterEventPage/>//<LoginPage/>
  },
  {
    path: "/login",
    element: <Navigate to="/" />
  },
  {
    path: '/',
    element: <EventsRoutes/>,
    children: [
      {
        path: "/",
        element: <Navigate to='/events-information' />
      },
      {
        path: "/events-information",
        element: <EventsInformationPage/>
      },
      {
        path: "/event-register",
        element: <RegisterEventPage/>
      },
      {
        path: "/workshop-register",
        element: <RegisterWorkshopPage/>
      },
      {
        path: "/technical-visit-register",
        element: <RegisterTechnicalVisitPage/>
      }
    ]
  }
])

export const AppRouter = () => {
  return (
    <>  
      <RouterProvider router={router} />
    </>
  )
}
