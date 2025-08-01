/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Dispatch, SetStateAction } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function TopBar({
    isOpen,
    setIsOpen,
    dark = false,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dark?: boolean;
}) {
    // ⬅️ Get user from Redux store
    const user:any = useSelector((state: RootState) => state?.auth?.user) as { name?: string; role?: string } | null;
    
 console.log(user, "user");


    return (
        <header className={`shadow-md ${dark ? "bg-white" : "bg-white"}`}>
            <div className="flex items-center justify-between px-4 py-3">
                {/* Toggle Button */}
                <button
                    className={`lg:hidden p-2 rounded-md transition-colors ${dark ? "bg-black" : "hover:bg-gray-100"}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <LuX className={`h-6 w-6 ${dark ? "text-white" : "text-gray-700"}`} />
                    ) : (
                        <LuMenu className={`h-6 w-6 ${dark ? "text-white" : "text-gray-700"}`} />
                    )}
                </button>

                {/* Welcome Message */}
                <div className="items-center gap-2">
                    <span className={`text-sm font-medium ${dark ? "text-black" : "text-gray-700"}`}>
                        Welcome Back, {user?.firstName || "John Doe"}!
                    </span>
                    <span className="text-xl">👋</span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-3">
                    {/* Avatar */}
                  <img src={user?.imageUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <div className={`font-medium ${dark ? "text-black" : "text-gray-500"}`}>
                            {`${user?.firstName}` ||`${user?.lastName}` || "John Doe"}
                        </div>
                        <div className={`text-xs ${dark ? "text-black" : "text-gray-500"}`}>
                             {user?.role || "Super Admin"}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
