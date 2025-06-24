import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
      <div className="bg-gray-900 text-white flex items-center justify-between py-4 px-10">
          <div className="logo">
          <h3>RemoteWork</h3>
          </div>
          <div className="flex gap-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="register">Register</NavLink>
              <NavLink to="rider">Rider Dashboard</NavLink>
              <NavLink to="client">Client Dashboard</NavLink>

              {/* <NavLink to="create">Create A task</NavLink> */}
          </div>

    </div>
  )
}
