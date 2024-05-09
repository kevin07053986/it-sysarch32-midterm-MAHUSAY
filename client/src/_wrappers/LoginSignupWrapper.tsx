import { Outlet } from "react-router-dom"

const LoginSignupWrapper = () => {
  return (
    <section className="grid place-items-center h-dvh relative text-white/90">
        <div className="blurry"></div>
      {<Outlet />}
    </section>
  )
}

export default LoginSignupWrapper
