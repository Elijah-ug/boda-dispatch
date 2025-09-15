import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Wallet from "../Wallet";

export const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(""); // track which dropdown is open

  return (
    <div className="flex sm:hidden items-center justify-between px-5 bg-green-700 font-bold py-3 text-amber-400 relative">
      <Link to="/" className="text-gray-800 text-xl">
        <div className="logo">
          <Wallet />
        </div>
      </Link>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <IoClose size={24} onClick={() => setOpenDropdown("")} /> : <FaBars size={24} />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full right-0 w-full bg-stone-700 flex flex-col gap-8 p-4 z-50">
          <NavLink onClick={() => setIsMenuOpen(false)} to="/" className="py-2 px-3 hover:bg-green-600 rounded">
            Home
          </NavLink>

          <NavLink onClick={() => setIsMenuOpen(false)} to="register" className="py-2 px-3 hover:bg-green-600 rounded">
            Register
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(false)} to="rider" className="py-2 px-3 hover:bg-green-600 rounded">
            Rider Dashboard
          </NavLink>

          <NavLink onClick={() => setIsMenuOpen(false)} to="client" className="py-2 px-3 hover:bg-green-600 rounded">
            Client Dashboard
          </NavLink>

          <NavLink onClick={() => setIsMenuOpen(false)} to="admin" className="py-2 px-3 hover:bg-green-600 rounded">
            Admin Dashboard
          </NavLink>

          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="available-clients"
            className="py-2 px-3 hover:bg-green-600 rounded"
          >
            Available Clients
          </NavLink>
        </div>
      )}
    </div>
  );
};
