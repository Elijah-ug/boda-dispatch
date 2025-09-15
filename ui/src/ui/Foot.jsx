import React from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";

export const Foot = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-3 md:px-10  flex flex-col gp-7 text-sm mt-14 ">
      {/* grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8*/}
      <div className="mx-auto00 flex  justify-around ">
        {/* Quick links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul className="space-y-5 text-gray-300">
            <li>
              <Link to="academics" className="hover:text-green-400">
                Academics
              </Link>
            </li>
            <li>
              <Link to="about" className="hover:text-green-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="academics/academic-departments" className="hover:text-green-400">
                Our Academics
              </Link>
            </li>
            <li>
              <Link to="contacts" className="hover:text-green-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
          <div className="flex flex-col gap-3">
            <p className="text-gray-300">📞 +256 700 000004</p>
            <p className="text-gray-300 flex">✉️ info@mukohigh.ac.ug</p>
            <p className="text-gray-300 flex items-center gap-1">
              <IoLocation /> located in Rubanda
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-4">
            <a href="#" className="bg-sky-400 p-3 rounded">
              {" "}
              <FaXTwitter />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaFacebook />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaTelegram />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaInstagram />{" "}
            </a>
          </div>
        </div>
      </div>

      <div className=" sm:hidden flex items-center justify-center pt-5 ">
        <div className="">
          <h3 className="text-xl font-bold text-center mb-3">Follow Us</h3>
          <div className="flex items-center gap-13 ">
            <a href="#" className="bg-sky-400 p-3 rounded">
              {" "}
              <FaXTwitter />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaFacebook />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaTelegram />{" "}
            </a>
            <a href="#" className="bg-sky-400 p-3 rounded">
              <FaInstagram />{" "}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Muko High School. All rights reserved.
      </div>
    </footer>
  );
};
