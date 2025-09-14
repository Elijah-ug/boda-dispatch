import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-3 md:px-10  flex flex-col gp-7 text-sm mt-14">
      <div className=" flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="flex gap-6 text-sm">
          {/* <a  href="https://github.com/Elijah-ug/utilityPayments" target='_blank' className="transition-colors duration-200">
            <FaGithub />
          </a> */}
          <a href="https://x.com/ElicomElijah" target="_blank" className="transition-colors duration-200">
            <FaXTwitter />
          </a>
          <a href="https://web.telegram.org/a/#1077582621" target="_blank" className="transition-colors duration-200">
            <FaTelegram />
          </a>
          <a
            href="https://www.linkedin.com/in/mugisha-elijah-88a291239/"
            target="_blank"
            className="transition-colors duration-200"
          >
            <FaLinkedin />
          </a>
          <a href="https://discord.com/channels/@me" target="_blank" className="transition-colors duration-200">
            <FaDiscord />
          </a>
        </div>

        {/* center */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} BodaBlocks. All rights reserved.</p>
        </div>

        {/* Right side */}
        <div className="flex gap-6 text-sm">
          <a to="#privacy" className="hover:text-amber-300 transition-colors duration-200">
            Privacy
          </a>
          <a to="#terms" className="hover:text-amber-300 transition-colors duration-200">
            Terms
          </a>
          <a to="#contact" className="hover:text-amber-300 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
