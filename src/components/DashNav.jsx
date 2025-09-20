"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import UserDropdown from "@/components/UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { clearUser, setUser } from "@/store/userSlice";

const DashNav = ({toggleTheme,isDarkMode,toggleMenu}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const drawerRef = useRef(null);
  const user = useSelector((state) => state.user);

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      // setIsMenuOpen is not defined, but this function isn't used
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const tempUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          dispatch(setUser(tempUser));
        } else {
          dispatch(clearUser());
        }
      });
      return () => unsubscribe();
    }, []);
  
  return (
    <header
      className={`
        fixed  top-0 right-0 z-30 w-full md:w-[calc(100%-16rem)]
        ${isDarkMode 
          ? "bg-gray-800 border-gray-700 text-white" 
          : "bg-white border-gray-200 text-gray-800"}
        border-b h-16 transition-colors duration-200
      `}
    >
      <div className="flex  items-center justify-between h-full px-4">
        <button 
          className={`md:hidden p-2 rounded-lg ${
            isDarkMode 
              ? "hover:bg-gray-700 text-white" 
              : "hover:bg-gray-100 text-gray-800"
          } transition-colors duration-200`}
          onClick={toggleMenu}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4 ml-auto">
          <button
            className={`
              p-2 rounded-lg transition-colors duration-200
              ${isDarkMode 
                ? "hover:bg-gray-700 text-gray-300 hover:text-white" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"}
            `}
          >
            <Bell className="w-6 h-6" />
          </button>
          <button
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition-colors duration-200
              ${isDarkMode 
                ? "hover:bg-gray-700 text-gray-300 hover:text-white" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"}
            `}
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
          <div>
            {user && <UserDropdown user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashNav;