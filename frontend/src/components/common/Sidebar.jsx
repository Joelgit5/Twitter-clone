import { Link } from "react-router-dom";
import XSvg from "../svgs/X";

import { BellRing, Home, LogOut, UserRound } from "lucide-react";
// Imports End

const Sidebar = () => {
  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start px-3">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4 px-3">
          {/* Home */}
          <li className="flex justify-center md:justify-start hover:bg-stone-900 rounded-full">
            <Link
              to="/"
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 lg:pl-3 pr-2 max-w-fit cursor-pointer"
            >
              <Home className="w-7 h-7" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>

          {/* Notifications */}
          <li className="flex justify-center md:justify-start hover:bg-stone-900 rounded-full">
            <Link
              to="/notifications"
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 lg:pl-3 pr-2 max-w-fit cursor-pointer"
            >
              <BellRing className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          {/* Profile */}
          <li className="flex justify-center md:justify-start hover:bg-stone-900 rounded-full">
            <Link
              to={`/profile/muhammad.usman`}
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 lg:pl-3 pr-2 max-w-fit cursor-pointer"
            >
              <UserRound className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>

        {/* Logout */}

        <Link className="mt-auto mb-[60px] lg:mb-1 flex gap-3 items-center transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full">
          {/* Profile Img */}
          <div className="avatar hidden md:flex items-center">
            <div className="w-8 rounded-full overflow-hidden">
              <img src="/avatar-placeholder.png" alt="User Avatar" />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center md:justify-between">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm w-20 truncate">
                Muhammad Usman
              </p>
              <p className="text-slate-500 text-[12px]">@muhammad.usman</p>
            </div>
            <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
              <LogOut className="w-5 h-5 cursor-pointer transform scale-x-[-1]" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
