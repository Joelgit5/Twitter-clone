import XSvg from "../svgs/X";

import { Link } from "react-router-dom";

import { BellRing, Home, LogOut, UserRound } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Imports End

const Sidebar = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");

        console.log(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logout successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: () => {
      toast.error("Logout Failed");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-14 md:w-full">
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
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 lg:pl-3 pr-2 max-w-fit cursor-pointer"
            >
              <UserRound className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>

        {/* Logout */}

        <Link
          to={`/profile/${authUser.username}`}
          className="mt-auto mb-[60px] lg:mb-0 flex gap-3 items-center transition-all duration-300 hover:bg-[#181818] py-2 px-2 rounded-full"
        >
          {/* Profile Img */}
          <div className="avatar hidden md:flex items-center">
            <div className="w-8 rounded-full overflow-hidden">
              <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center md:justify-between gap-1">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm w-20 truncate">
                {authUser?.fullName}
              </p>
              <p className="text-slate-500 text-[11px]">
                @{authUser?.username}
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
              <LogOut
                onClick={(e) => {
                  e.preventDefault();
                  logoutMutation();
                }}
                className="w-5 h-5 cursor-pointer transform scale-x-[-1]"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
