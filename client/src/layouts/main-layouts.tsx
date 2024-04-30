import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto">
        <Outlet />
    </section>
  )
}
export default MainLayout