import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section>
        <div className="max-w-screen-2xl mx-auto px-4 min-h-[calc(100dvh-80px)] grid lg:grid-cols-2 grid-cols-1 w-full">
            <Outlet />
        </div>
    </section>
  )
}
export default AuthLayout