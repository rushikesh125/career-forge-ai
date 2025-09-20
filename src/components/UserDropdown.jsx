"use client";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import CustomBtn from "./CustomBtn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const UserDropdown = ({ user }) => {
  const { displayName, email, uid, photoURL } = user;
  const [imgSrc, setImgSrc] = useState(photoURL ?? "/assets/profile1.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <img
            src={imgSrc}
            alt="Profile"
            width={32}
            height={32}
            onError={() => setImgSrc("/assets/profile1.png")}
            className="rounded-full border border-gray-200 dark:border-gray-600 transition-all duration-200"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {displayName ?? "User"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-200 animate-fadeIn">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {displayName ?? "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {email}
              </p>
            </div>

            <div className="py-1">
              <Link
                href={`/dashboard`}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 rounded-md transition-colors duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Dashboard
              </Link>
              <button 
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 rounded-md transition-colors duration-200"
              >
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Settings
              </button>
              <button 
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 rounded-md transition-colors duration-200"
              >
                <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Privacy
              </button>
              <button 
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 rounded-md transition-colors duration-200"
              >
                <HelpCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Help Center
              </button>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 py-1">
              <CustomBtn
                isLoading={isLoading}
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 rounded-md transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </CustomBtn>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDropdown;