import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { LoginPage } from "../features/auth/pages/LoginPage"
import { EventsInformationPage } from "../features/events/pages/EventsInformationPage"
import { EventsRoutes } from "../features/events/routes/EventsRoutes"
import { RegisterEventPage } from "../features/events/pages/RegisterEventPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
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
