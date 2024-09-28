import { Outlet } from "react-router-dom"
import { NavigationBar } from "../../../shared/components/NavigationBar"
import { Footer } from "../../../shared/components/Footer"

export const EventsRoutes = () => {
  return (
    <>
      <NavigationBar/>
      <main className="main-container">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}
