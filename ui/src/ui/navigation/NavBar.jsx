import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="bg-gray-900 text-white flex items-center justify-between py-5 px-10">
      <div className="logo">
        <h3>BodaBlocks</h3>
      </div>
      <div className="flex gap-6 text-sm">
        <NavLink to="/">Home</NavLink>
        <NavLink to="register">Register</NavLink>
        <NavLink to="rider">Rider Dashboard</NavLink>
        <NavLink to="client">Client Dashboard</NavLink>
        <NavLink to="admin">Admin Dashboard</NavLink>
        <NavLink to="available-clients">Available Customers</NavLink>
      </div>
    </div>
  );
}
